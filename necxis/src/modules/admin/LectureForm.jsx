import React from "react";
// import { MdPhoto } from "react-icons/md";
import { Datepicker } from "flowbite-react";

const LectureForm = () => {
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">
            Add Lecture for "java"
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 "
              >
                Select instructor
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>MR.SUBHASH</option>
                  <option>MR.HARESH</option>
                  <option>MR.SUJENDRA</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-white"
              >
                Select date
              </label>
              <div className="mt-2">
                <Datepicker className="text-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className=" border-gray-500 bg-white text-black px-4 py-2 rounded-full"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default LectureForm;
