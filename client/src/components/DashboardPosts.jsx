import { useState } from "react";

import { UserPosts } from "./UserPosts";
import { useCurrentUser } from "../redux/user/userActions";
import { useGetPostsById } from "../lib/queries";
import { LoadingArea } from "./LoadingArea";

export const DashboardPosts = () => {
  const [page, setPage] = useState(1);
  const { currentUser } = useCurrentUser();

  const {
    data: userPosts,
    isLoading,
    isSuccess,
  } = useGetPostsById(currentUser._id, page);

  const handleShowMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <div className="table-auto overflow-x-scroll sm:overflow-hidden md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {isLoading && <LoadingArea />}
      {currentUser.isAdmin && isSuccess && (
        <UserPosts
          showMore={userPosts.totalPosts > 9 * page}
          posts={userPosts.posts}
          userId={currentUser._id}
          handleShowMore={handleShowMore}
        />
      )}
      {userPosts?.posts?.length === 0 && <p>You have no post yet!</p>}
    </div>
  );
};
