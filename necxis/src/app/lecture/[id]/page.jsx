"use client";
import { usePaginationItem } from "@nextui-org/react";
import { Datepicker } from "flowbite-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const page = () => {
  const searchParams = useSearchParams();
  const courseId = useParams();
  const router = useRouter();

  const queryParams = searchParams.get("course");
  console.log(queryParams);

  const [instructorName, setInstructorName] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const displayError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(date);
    try {
      const response = await axios.post(
        `http://localhost:9000/courses/${courseId.id}/lectures`,
        {
          instructorName,
          date, // Using only the date part
        }
      );
      alert("Lecture added successfully:", response.data);
      router.push(`/instructor`);

      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error("Error adding lecture:", error.message);

      // Display error message to the user
      if (error.response && error.response.status === 400) {
        displayError(error.response.data.message);
      } else {
        displayError("Failed to add lecture. Please try again later.");
      }
    }
  };

  return (
    <div>
      <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-500">
                Add New Lecture{" "}
                <span className=" text-xl text-white "> {queryParams}</span>
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 ">
                <div className="col-span-2">
                  <label
                    htmlFor="instructorName"
                    className="block text-sm font-medium leading-6"
                  >
                    Instructor name
                  </label>
                  <div className="mt-2">
                    <input
                      id="instructorName"
                      name="instructorName"
                      required
                      value={instructorName}
                      onChange={(e) => setInstructorName(e.target.value)}
                      className="block w-full rounded-md border-0 px-3 py-3 capitalize text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="w-full col-span-2">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6"
                  >
                    Select Date{" "}
                    <span className="text-gray-400 text-xs">
                      (click spacebar to open calender )
                    </span>
                  </label>
                  <div className="w-full border rounded-lg">
                    <input
                      required
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="text-sm rounded-lg block w-full ps-10 p-2.5 dark:placeholder-gray-400 bg-black text-white px-10 border-gray"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {error && <div className="mt-4 text-red-600">{error}</div>}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="text-sm font-semibold leading-6 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-gray-500 bg-white text-black px-4 py-2 rounded-full"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default page;
