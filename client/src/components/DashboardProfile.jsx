/* eslint-disable */

import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import { HiCamera } from "react-icons/hi";
import { Link } from "react-router-dom";

import { useCurrentUser } from "../redux/user/userActions";
import { DeleteModal } from "./DeleteModal";
import { useSignOut, useTerminateUser, useUpdateUser } from "../lib/mutations";

export const DashboardProfile = () => {
  const { currentUser, loading } = useCurrentUser();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [clientUpdateError, setClientUpdateError] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const signOutMutation = useSignOut();
  const terminateUserMutation = useTerminateUser();
  const {
    mutateAsync,
    error: updateUserError,
    isSuccess: updateUserSuccess,
  } = useUpdateUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClientUpdateError(null);

    if (Object.keys(formData).length === 0) {
      setClientUpdateError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setClientUpdateError("Please wait for image to upload");
      return;
    }

    await mutateAsync({ id: currentUser._id, formData });
  };

  const handleDeleteUser = async () => {
    setShowModal(false);

    terminateUserMutation.mutateAsync(currentUser._id);
  };

  const handleSignOut = async () => {
    await signOutMutation.mutateAsync();
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <HiCamera className="absolute top-0 right-2 w-10 h-10 text-sky-900 dark:text-blue-500 z-10" />
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="John Doe"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="johndoe@gmail.com"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="*********"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || imageFileUploading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
        {currentUser?.isAdmin && (
          <Link to="/create-post">
            <Button
              type="button"
              className="w-full"
              gradientDuoTone="purpleToPink"
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="flex justify-between text-red-500 mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          User&apos;s profile updated successfully
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError.message}
        </Alert>
      )}
      {clientUpdateError && (
        <Alert color="failure" className="mt-5">
          {clientUpdateError}
        </Alert>
      )}
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
};
