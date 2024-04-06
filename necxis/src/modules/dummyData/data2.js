import React from "react";
const columns = [
  { name: "Course", uid: "courseN" },
  { name: "Instructor", uid: "instructorN" },
  { name: "Date", uid: "date" },
  { name: "Actions", uid: "actions" },
];

const users = [
  {
    id: 2,
    courseName: "python",
    Instructorname: "Ms. Priya",
    date: "5/15/2018",
    avatar: "https://i.pravatar.cc/150?u=d7a4f5891b07b6117e2a",
    email: "priya@example.com",
  },
  {
    id: 3,
    courseName: "JavaScript",
    Instructorname: "Dr. Rajesh",
    date: "8/20/2016",
    avatar: "https://i.pravatar.cc/150?u=736ef032c7ec6a231d0e",
    email: "rajesh@example.com",
  },
  {
    id: 4,
    courseName: "C++",
    Instructorname: "Mr. Ankit",
    date: "1/7/2019",
    avatar: "https://i.pravatar.cc/150?u=74dd59193d8b2dcaecfd",
    email: "ankit@example.com",
  },
  {
    id: 5,
    courseName: "Data Structures",
    Instructorname: "Ms. Neha",
    date: "11/12/2020",
    avatar: "https://i.pravatar.cc/150?u=ba0c4d0eb65d460e4f1b",
    email: "neha@example.com",
  },
  {
    id: 6,
    courseName: "HTML & CSS",
    Instructorname: "Mr. Rahul",
    date: "3/25/2017",
    avatar: "https://i.pravatar.cc/150?u=36d93f5ecf3d4b2a3f7d",
    email: "rahul@example.com",
  },
];

export { columns, users };
