"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function EditCourse() {
  const router = useRouter();
  const courseId = useParams();
  const [course, setCourse] = useState({
    name: "",
    hardLevel: "",
    description: "",
    coverPhoto: "",
  });

  console.log(courseId.id);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/courses/${courseId.id}`
        );
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/courses/${courseId.id}`, course);
      router.push("/"); // Redirect to home page after successful update
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div>
      <h1>Edit Course</h1>
      {/* <p>Editing course with ID: {courseId}</p> */}
      <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-white">
                Edit course
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="courseName"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Course Name
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      type="text"
                      value={course.name}
                      name="courseName"
                      id="courseName"
                      className="block w-full px-3 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="hardLevel"
                    className="block text-sm font-medium leading-6 "
                  >
                    Hard level
                  </label>
                  <div className="mt-2">
                    <select
                      id="hardLevel"
                      name="hardLevel"
                      autoComplete="levels"
                      className="block w-full rounded-md border-0 py-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 "
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={course.description}
                      onChange={handleChange}
                      className="block px-3 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="coverPhoto"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/75 px-6 py-10 flex-col items-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-black font-semibold text-white   flex flex-col items-center"
                    >
                      <span className="pb-4">Upload a file</span>
                      <input
                        className=""
                        type="file"
                        id="image"
                        accept="image/*"
                      />
                    </label>
                    <p className="pt-4">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link
              href="/"
              type="button"
              className="text-sm font-semibold leading-6 text-white"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className=" border-gray-500 bg-white text-black px-4 py-2 rounded-full"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
