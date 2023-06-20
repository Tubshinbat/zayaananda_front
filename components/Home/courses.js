"use client";

import base from "lib/base";
import { getCourses } from "lib/course";
import Link from "next/link";
import { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { courses } = await getCourses(`status=true&limit=3`);
      setCourses(courses);
    };

    fetchCourses().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <section className="homeCourse">
        <div className="container">
          <div className="sectionHeader dark">
            <div className="sectionTitle">
              <p className="sectionSub"> Zaya's Ananda</p>
              <h3 className="white">
                Манай <span> сургалтууд </span>
              </h3>
            </div>
            <Link href="/courses"> Бүх сургалтууд </Link>
          </div>
          <div className="row course-list">
            {courses &&
              courses.map((course, index) => {
                let url = "";
                if (course.type === "online") {
                  url = `/online/${course._id}`;
                } else {
                  url = `/courses/${course._id}`;
                }
                return (
                  <div className="col-xl-4 col-lg-6" key={`course_${index}`}>
                    <div className="courseBox">
                      <Link href={url}>
                        <div className="courseImg">
                          <div className="courseType">
                            {course.type === "local" ? "Танхим" : "Онлайн"}
                          </div>
                          {course.pictures && course.pictures[0] && (
                            <img src={`${base.cdnUrl}/${course.pictures[0]}`} />
                          )}
                        </div>
                      </Link>
                      <div className="courseTitle">
                        <Link href={url}>
                          <h4>{course.name}</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
