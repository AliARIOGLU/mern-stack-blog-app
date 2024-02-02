import { PostCard } from "./PostCard";
import { useGetPosts } from "../lib/queries";

const POST_LIMIT = 3;

export const RecentArticles = () => {
  const { data, isSuccess } = useGetPosts(`limit=${POST_LIMIT}`);

  return (
    <>
      <div className="flex flex-wrap gap-5 mt-5 justfiy-center">
        {isSuccess > 0 &&
          data.posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </>
  );
};
