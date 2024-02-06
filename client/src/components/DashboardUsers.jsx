import { useState } from "react";
import { UserList } from "./UserList";
import { useGetUsers } from "../lib/queries";
import { useCurrentUser } from "../redux/user/userActions";
import { LoadingArea } from "./LoadingArea";

export const DashboardUsers = () => {
  const { currentUser } = useCurrentUser();
  const [page, setPage] = useState(1);

  const {
    data: usersData,
    isSuccess,
    isLoading,
  } = useGetUsers(currentUser, page);

  const showMore = usersData?.totalUsers > 9 * page;

  const handleShowMore = () => {
    setPage((page) => page + 1);
  };

  if (isLoading) {
    return <LoadingArea size="lg" />;
  }

  if (usersData?.users?.length === 0) {
    <div className="min-h-screen w-full flex justify-center items-center">
      <p className="text-2xl italic text-slate-700 dark:text-slate-200">
        There is no user yet!
      </p>
    </div>;
  }

  return (
    <div className="table-auto overflow-x-scroll sm:overflow-hidden md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && isSuccess && (
        <UserList
          showMore={showMore}
          users={usersData.users}
          handleShowMore={handleShowMore}
        />
      )}
    </div>
  );
};
