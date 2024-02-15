import { PostCard } from "./PostCard";
import { useGetPosts } from "../lib/queries";

const POST_LIMIT = 3;

export const RecentArticles = () => {
  const { data, isSuccess } = useGetPosts(`limit=${POST_LIMIT}`);

  return (
    <>
      <div className="mt-5 grid grid-cols-1 sm:grid-col-2 md:grid-col-3 lg:grid-cols-4 gap-8">
        {isSuccess > 0 &&
          data.posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </>
  );
};
