/* eslint-disable */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { useDeletePost } from "../lib/mutations";

export const UserPost = ({ post, userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const deletePostMutation = useDeletePost();

  const handleDeletePost = async () => {
    setShowModal(false);

    await deletePostMutation.mutateAsync({ postId: postIdToDelete, userId });
  };

  return (
    <>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
        <Table.Cell>
          <Link to={`/post/${post?.slug}`}>
            <img
              src={post?.image}
              alt={post.title}
              className="w-20 h-10 object-cover bg-gray-500"
            />
          </Link>
        </Table.Cell>
        <Table.Cell>
          <Link
            className="font-medium text-gray-900 dark:text-white"
            to={`/post/${post?.slug}`}
          >
            {post.title}
          </Link>
        </Table.Cell>
        <Table.Cell>{post.category}</Table.Cell>
        <Table.Cell>
          <span
            onClick={() => {
              setShowModal(true);
              setPostIdToDelete(post._id);
            }}
            className="font-medium text-red-500 cursor-pointer hover:bg-red-950 p-1 rounded-md hover:text-white transition-colors duration-200"
          >
            Delete
          </span>
        </Table.Cell>
        <Table.Cell>
          <Link to={`/update-post/${post._id}`}>
            <span className="text-teal-500 hover:underline">Edit</span>
          </Link>
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
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
