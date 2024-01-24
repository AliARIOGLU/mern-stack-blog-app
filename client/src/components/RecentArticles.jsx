import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";

const POST_LIMIT = 3;

export const RecentArticles = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=${POST_LIMIT}`);
        const data = await res.json();

        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  return (
    <div className="flex flex-wrap gap-5 mt-5 justfiy-center">
      {recentPosts.length > 0 &&
        recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
    </div>
  );
};
