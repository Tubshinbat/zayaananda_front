"use client";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import base from "lib/base";
import { getMenu } from "lib/menus";
import { getOnlineCourses } from "lib/online";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [menu, setMenu] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { menu } = await getMenu(`direct=services`);
      const { courses } = await getOnlineCourses(`status=true&type=local`);
      console.log(courses);
      setMenu(menu);
      setCourses(courses);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div
        className="pageDetailsHeader"
        style={{
          backgroundImage:
            menu && menu.cover && menu.cover !== ""
              ? `url("${base.cdnUrl}/${menu.cover}")`
              : `/images/header.jpg`,
        }}
      >
        <div className="container">
          <h2> Сургалтууд </h2>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="row">
            {courses.map((course) => (
              <div className="col-md-3">
                <div className="col-course-item">
                  <Link href={`/courses/${course._id}`}>
                    <div className="col-course-picture">
                      {course.pictures && course.pictures[0] && (
                        <img src={base.cdnUrl + "/450/" + course.pictures[0]} />
                      )}
                    </div>
                  </Link>
                  <div className="col-course-details">
                    <Link href={`/courses/${course._id}`}>
                      <h3> {course.name}</h3>
                    </Link>
                    <div className="col-course-info">
                      <div className="course-info">
                        <FontAwesomeIcon icon={faEye} /> {course.views} үзсэн
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
