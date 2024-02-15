/* eslint-disable */

import { Link } from "react-router-dom";

import { PostCard } from "./PostCard";
import { LoadingArea } from "./LoadingArea";

export const HomePosts = ({ posts, isLoading }) => {
  return (
    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
      <div className="mx-auto">{isLoading && <LoadingArea />}</div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <Link
          to={"/search"}
          className="text-lg text-teal-500 hover:underline text-center"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};
