/* eslint-disable */

import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { LoadingArea } from "./LoadingArea";

export const DashboardPostsTable = ({ postsData, isPostsLoading }) => {
  return (
    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
      <div className="flex justify-between  p-3 text-sm font-semibold">
        <h1 className="text-center p-2">Recent posts</h1>
        <Button outline gradientDuoTone="purpleToPink">
          <Link to={"/dashboard?tab=posts"}>See all</Link>
        </Button>
      </div>
      {isPostsLoading && <LoadingArea />}
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Post image</Table.HeadCell>
          <Table.HeadCell>Post Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
        </Table.Head>
        {postsData?.posts &&
          postsData?.posts?.map((post) => (
            <Table.Body key={post?._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <img
                    src={post?.image}
                    alt="user"
                    className="w-14 h-10 rounded-md bg-gray-500"
                  />
                </Table.Cell>
                <Table.Cell className="w-96">{post?.title}</Table.Cell>
                <Table.Cell className="w-5">{post?.category}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
      </Table>
    </div>
  );
};
