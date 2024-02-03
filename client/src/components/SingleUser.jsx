/* eslint-disable */

import { Table, Modal, Button } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useDeleteUser } from "../lib/mutations";

export const SingleUser = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = async () => {
    setShowModal(false);

    await deleteUserMutation.mutateAsync(userIdToDelete);
  };

  return (
    <>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
        <Table.Cell>
          <img
            src={user?.profilePicture}
            alt={user.username}
            className="w-10 h-10 object-cover bg-gray-500 rounded-full"
          />
        </Table.Cell>
        <Table.Cell>{user.username}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>
          {user.isAdmin ? (
            <FaCheck className="text-green-500 mx-auto" />
          ) : (
            <FaTimes className="text-red-500 mx-auto" />
          )}
        </Table.Cell>
        <Table.Cell>
          <span
            onClick={() => {
              if (user.isAdmin) {
                return;
              }

              setShowModal(true);
              setUserIdToDelete(user._id);
            }}
            className={`font-medium text-red-500 cursor-pointer hover:bg-red-950 p-1 rounded-md hover:text-white transition-colors duration-200 ${
              user.isAdmin ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            Delete
          </span>
        </Table.Cell>
      </Table.Row>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
