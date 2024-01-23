/* eslint-disable */

import { Table } from "flowbite-react";
import { SingleUser } from "./SingleUser";

export const UserList = ({ users, showMore, setUsers, setShowMore }) => {
  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prevUsers) => [...prevUsers, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>Date created</Table.HeadCell>
          <Table.HeadCell>User image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Admin</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {users.map((user) => (
            <SingleUser user={user} key={user._id} setUsers={setUsers} />
          ))}
        </Table.Body>
      </Table>
      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-teal-500 self-center text-sm py-7"
        >
          Show more
        </button>
      )}
    </>
  );
};
