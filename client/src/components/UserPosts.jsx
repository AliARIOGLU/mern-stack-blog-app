/* eslint-disable */

import { Table } from "flowbite-react";
import { UserPost } from "./UserPost";

export const UserPosts = ({
  posts,
  showMore,
  userId,
  setUserPosts,
  setShowMore,
}) => {
  const handleShowMore = async () => {
    const startIndex = posts.length;

    try {
      const res = await fetch(
        `/api/post/getposts?userId=${userId}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prevUsers) => [...prevUsers, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
            <UserPost
              post={post}
              key={post._id}
              userId={userId}
              setUserPosts={setUserPosts}
            />
          ))}
        </Table.Body>
      </Table>
      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-teal-500 self-center text-sm py-7"
        >
          Show more
        </button>
      )}
    </>
  );
};
