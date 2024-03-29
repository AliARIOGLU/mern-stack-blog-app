/* eslint-disable */

import { useState } from "react";
import { Button, Textarea, Alert, Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import classNames from "classnames";

import { Comment } from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useCurrentUser } from "../redux/user/userActions";
import { useGetCommentsById } from "../lib/queries";
import {
  useCreateComment,
  useDeleteComment,
  useLikeComment,
} from "../lib/mutations";

export const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();

  const { data: comments } = useGetCommentsById(postId);

  const { mutateAsync, error: commentError } = useCreateComment();
  const deleteCommentMutation = useDeleteComment();
  const likeCommentMutation = useLikeComment();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) return;

    const res = await mutateAsync({
      content: comment,
      userId: currentUser._id,
      postId,
    });

    if (res) {
      setComment("");
    }
  };

  const handleLike = async (commentId) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    await likeCommentMutation.mutateAsync(commentId);
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);

    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    await deleteCommentMutation.mutateAsync(commentId);
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="w-5 h-5 object-cover rounded-full"
            src={currentUser?.profilePicture}
            alt="user image"
          />
          <Link
            className="text-xs text-cyan-600 hover:underline"
            to={`/dashboard?tab=profile`}
          >
            @{currentUser?.username}
          </Link>
        </div>
      ) : (
        <div className="tex-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-5">
            {comment.length > 0 && (
              <CircularProgressbar
                value={comment.length / 2}
                text={
                  200 - comment.length < 20 ? `${200 - comment.length}` : ""
                }
                strokeWidth={8}
                className={classNames(
                  "h-7 w-7 text-md overflow-hidden transition-all duration-200",
                  {
                    "h-8 w-8": 200 - comment.length < 20,
                  }
                )}
                styles={buildStyles({
                  textSize: "48px",
                  pathColor:
                    comment.length === 200
                      ? "rgb(255, 0,0)"
                      : 200 - comment.length < 20
                      ? "rgb(253,210,1)"
                      : "",
                  textColor: comment.length === 200 ? "red" : "gray",
                })}
              />
            )}

            <Button
              type="submit"
              outline
              gradientDuoTone="purpleToBlue"
              className="ml-auto"
            >
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError.message}
            </Alert>
          )}
        </form>
      )}
      {comments?.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments?.length}</p>
            </div>
          </div>
          {comments?.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              currentUser={currentUser}
              // handleEditSubmit={handleEditSubmit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
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
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
