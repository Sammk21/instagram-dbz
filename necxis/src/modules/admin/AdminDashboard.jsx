"use client";

import React, { useEffect, useState } from "react";
import { columns, users } from "../dummyData/data";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import ClassicButton from "../common/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function Admin({ courses }) {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    setCourseList(courses);
  }, [courses]);

  const router = useRouter();

  const renderCell = React.useCallback((course, columnKey) => {
    const cellValue = course[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: "http://localhost:9000/" + course.avatar,
            }}
            name={cellValue}
          ></User>
        );
      case "level":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "description":
        return (
          <div style={{ maxHeight: "60px", overflowY: "auto" }}>
            <span
              className="capitalize"
              color={statusColorMap[course.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </span>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit Course">
              <Link
                href={`/editcourse/${course._id}`}
                className="text-lg  cursor-pointer active:opacity-50"
              >
                <FiEdit3 />
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete course">
              <span
                onClick={() => handleDelete(course._id)}
                className="text-lg text-[#ff1d1d] cursor-pointer active:opacity-50"
              >
                <MdDeleteOutline />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Add lecture">
              <Link
                className="text-lg text-danger font-bold cursor-pointer
                active:opacity-50"
                href={{
                  pathname: `/lecture/${course._id}`,
                  query: { course: course.name },
                }}
              >
                <GoPlus />
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make the DELETE request to the backend API endpoint
      const response = await axios.delete(
        `http://localhost:9000/courses/${id}`
      );
      if (response.status === 204) {
        console.log("Course deleted successfully");
        // Remove the deleted course from the course list
        setCourseList((prevCourseList) =>
          prevCourseList.filter((course) => course._id !== id)
        );
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      // Handle error
      console.error("Error deleting course:", error);
    }
  };

  return (
    <>
      <div className="text-[3vw] capitalize font-bold text-gray-500 pb-6">
        <h1>course details</h1>
      </div>
      <Link href="/addcourse">
        <ClassicButton />
      </Link>
      <div>
        <h5 className="text-gray-400">
          click ( <span className="text-white font-bold">+</span> ) icon to
          Assign{" "}
          <span className="font-bold text-white">lecture and instructor</span>{" "}
          for particular course
        </h5>
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={courseList}>
          {(course) => (
            <TableRow key={course._id}>
              {(columnKey) => (
                <TableCell>{renderCell(course, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
