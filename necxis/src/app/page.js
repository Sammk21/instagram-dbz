"use client";
import Admin from "@/modules/admin/AdminDashboard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:9000/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  console.log(courses);

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
      <Admin courses={courses} />
    </main>
  );
}
