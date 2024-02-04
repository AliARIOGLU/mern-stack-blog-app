import {
  HiAnnotation,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";

import { useGetComments, useGetPosts, useGetUsers } from "../lib/queries";
import { TotalCard } from "./TotalCard";
import { DashboardUsersTable } from "./DashboardUsersTable";
import { DashboardCommentsTable } from "./DashboardCommentsTable";
import { DashboardPostsTable } from "./DashboardPostsTable";
import { useCurrentUser } from "../redux/user/userActions";

export const DashboardContent = () => {
  const { currentUser } = useCurrentUser();

  const { data: postsData, isLoading: isPostsLoading } = useGetPosts("limit=5");
  const { data: usersData, isLoading: isUsersLoading } = useGetUsers();
  const { data: commentsData, isLoading: isCommentsLoading } = useGetComments();

  if (!currentUser.isAdmin) return;

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <TotalCard
          totalTitle="Total Users"
          totalDataCount={usersData?.totalUsers}
          icon={HiOutlineUserGroup}
          lastMonthData={usersData?.lastMonthUsers}
          thisMonthData={usersData?.thisMonthUsers}
          isLoading={isUsersLoading}
        />
        <TotalCard
          totalTitle="Total Comments"
          totalDataCount={commentsData?.totalComments}
          icon={HiAnnotation}
          lastMonthData={commentsData?.lastMonthComments}
          thisMonthData={commentsData?.thisMonthComments}
          isLoading={isCommentsLoading}
        />
        <TotalCard
          totalTitle="Total Posts"
          totalDataCount={postsData?.totalPosts}
          icon={HiDocumentText}
          lastMonthData={postsData?.lastMonthPosts}
          thisMonthData={postsData?.thisMonthPosts}
          isLoading={isPostsLoading}
        />
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <DashboardUsersTable
          usersData={usersData}
          isUsersLoading={isUsersLoading}
        />
        <DashboardCommentsTable
          commentsData={commentsData}
          isCommentsLoading={isCommentsLoading}
        />
        <DashboardPostsTable
          postsData={postsData}
          isPostsLoading={isPostsLoading}
        />
      </div>
    </div>
  );
};
