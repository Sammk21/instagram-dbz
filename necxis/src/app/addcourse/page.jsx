"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    hardLevel: "Easy",
    description: "",
    coverPhoto: null,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      coverPhoto: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.courseName);
      formDataToSend.append("level", formData.hardLevel);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("avatar", formData.coverPhoto);

      const response = await axios.post(
        "http://localhost:9000/courses",
        formDataToSend
      );
      router.push("/");
      console.log("course created:", response.data);
      alert("data added ", response.data); // You can handle response here

      setFormData({
        courseName: "",
        hardLevel: "Easy",
        description: "",
        coverPhoto: null,
      });
    } catch (error) {
      router.push("/");
      setFormData({
        courseName: "",
        hardLevel: "Easy",
        description: "",
        coverPhoto: null,
      });
      console.error("Error:", error);
      alert("data not added ", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Add course
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
                    type="text"
                    name="courseName"
                    id="courseName"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
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
                      onChange={handleFileChange}
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
  );
};

export default CourseForm;
