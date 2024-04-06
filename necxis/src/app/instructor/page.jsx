"use client";
import React, { useEffect, useState } from "react";
import { columns } from "@/modules/dummyData/data2";
import { Tooltip } from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const Page = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/courses/in/lectures"
        );
        setLectures(response.data);
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    fetchLectures();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make the DELETE request to the backend API endpoint
      const response = await axios.delete(
        `http://localhost:9000/courses/lectures/${id}`
      );
      if (response.status === 204) {
        alert("Course deleted successfully");
        // Remove the deleted lecture from the state
        setLectures(lectures.filter((lecture) => lecture._id !== id));
      } else {
        alert("Failed to delete course");
      }
    } catch (error) {
      // Handle error
      console.error("Error deleting course:", error);
    }
  };

  return (
    <main className="flex flex-col justify-center w-[100vw] p-24 gap-y-6">
      <div className="text-[3vw] capitalize font-bold text-gray-500 pb-6">
        <h1>Instructor dashboard</h1>
      </div>
      <div></div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="">
              {columns.map((column) => (
                <th key={column.uid} className="px-4 py-2 text-left">
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture) => (
              <tr key={lecture._id} className="text-sm my-6">
                <td className="px-4 py-2">{lecture?.course?.name}</td>
                <td className="px-4 py-2">{lecture?.instructorName}</td>
                <td className="px-4 py-2">{lecture.date}</td>
                <td className="px-4 py-2">
                  <div className="relative flex items-center gap-2">
                    <Tooltip color="danger" content="Delete course">
                      <span
                        className="text-lg text-[#ff1d1d] cursor-pointer active:opacity-50"
                        onClick={() => handleDelete(lecture._id)}
                      >
                        <MdDeleteOutline />
                      </span>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Page;
