/* eslint-disable */

import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export const UserPost = ({ post }) => {
  return (
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
        <span className="font-medium text-red-500 cursor-pointer hover:bg-red-950 p-1 rounded-md hover:text-white transition-colors duration-200">
          Delete
        </span>
      </Table.Cell>
      <Table.Cell>
        <Link to={`/update-post/${post._id}`}>
          <span className="text-teal-500 hover:underline">Edit</span>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};
