import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserList } from "./UserList";

export const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`/api/user/getusers`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    };
    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id, currentUser?.isAdmin]);

  return (
    <div className="table-auto overflow-x-scroll sm:overflow-hidden md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && users.length > 0 ? (
        <UserList
          showMore={showMore}
          users={users}
          setUsers={setUsers}
          setShowMore={setShowMore}
        />
      ) : (
        <p>There is no user yet!</p>
      )}
    </div>
  );
};
