import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserPosts } from "./UserPosts";

export const DashboardPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    };
    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser?.isAdmin]);

  return (
    <div className="table-auto overflow-x-scroll sm:overflow-hidden md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <UserPosts
          showMore={showMore}
          posts={userPosts}
          userId={currentUser._id}
          setUserPosts={setUserPosts}
          setShowMore={setShowMore}
        />
      ) : (
        <p>You have no post yet!</p>
      )}
    </div>
  );
};
