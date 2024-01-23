/* eslint-disable */

import { Table } from "flowbite-react";
import { UserPost } from "./UserPost";

export const UserPosts = ({ posts }) => {
  return (
    <Table hoverable className="shadow-md">
      <Table.Head>
        <Table.HeadCell>Date updated</Table.HeadCell>
        <Table.HeadCell>Post image</Table.HeadCell>
        <Table.HeadCell>Post title</Table.HeadCell>
        <Table.HeadCell>Category</Table.HeadCell>
        <Table.HeadCell>Delete</Table.HeadCell>
        <Table.HeadCell>
          <span>Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {posts.map((post) => (
          <UserPost post={post} key={post._id} />
        ))}
      </Table.Body>
    </Table>
  );
};
