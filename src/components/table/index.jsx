import { formatDate } from "@/libs/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

const TableLeaderboard = ({ users }) => {
  const columns = [
    { key: "rank", label: "Rank" },
    { key: "name", label: "Name" },
    { key: "activity_points", label: "Activity Points" },
    { key: "laststudy", label: "Last Study" },
  ];

  const sortedUsers = users.sort(
    (a, b) => (b.activity_points || 0) - (a.activity_points || 0)
  );

  const topUsers = sortedUsers.slice(0, 10);

  return (
    <Table aria-label="Leaderboard table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} className="text-center">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {topUsers.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="text-center">{user.fullname}</TableCell>
            <TableCell className="text-center">
              {user.activity_points || 0}
            </TableCell>
            <TableCell className="text-center">
              {formatDate(user.last_study)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableLeaderboard;
