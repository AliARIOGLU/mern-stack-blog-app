/* eslint-disable */

import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { LoadingArea } from "./LoadingArea";

export const DashboardUsersTable = ({ usersData, isUsersLoading }) => {
  return (
    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
      <div className="flex justify-between  p-3 text-sm font-semibold">
        <h1 className="text-center p-2">Recent users</h1>
        <Button outline gradientDuoTone="purpleToPink">
          <Link to={"/dashboard?tab=users"}>See all</Link>
        </Button>
      </div>
      {isUsersLoading && <LoadingArea />}
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>User image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
        </Table.Head>
        {usersData?.users &&
          usersData?.users?.map((user) => (
            <Table.Body key={user._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <img
                    src={user.profilePicture}
                    alt="user"
                    className="w-10 h-10 rounded-full bg-gray-500"
                  />
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
      </Table>
    </div>
  );
};
