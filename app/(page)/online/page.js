"use client";
import {
  faGraduationCap,
  faPlay,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlockLoad from "components/Generals/BlockLoad";
import Loader from "components/Generals/Loader";
import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getMenu } from "lib/menus";
import { getOnlineCourses } from "lib/online";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [menu, setMenu] = useState(null);
  const [courses, setCourses] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { menu } = await getMenu(`direct=online`);
      const { courses, pagination } = await getOnlineCourses(
        `status=true&type=online`
      );

      setMenu(menu);
      setCourses(courses);
      setPaginate(pagination);
      setLoader(false);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  const nextpage = () => {
    const next = async () => {
      const { courses, pagination } = await getOnlineCourses(
        `status=true&type=online&page=${paginate.nextPage}`
      );
      setCourses((bs) => [...bs, ...courses]);
      setPaginate(pagination);
      setLoader(false);
    };

    if (paginate && paginate.nextPage) {
      setLoader(true);
      next().catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div
        className="pageDetailsHeader"
        style={{
          background:
            menu && menu.cover && menu.cover !== ""
              ? `url("${base.cdnUrl}/${menu.cover}")`
              : `url(/images/header.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h2> Онлайн сургалтууд </h2>
          <div className="bread">
            <li>
              <Link href="/"> Нүүр </Link>
            </li>
            <span> /</span>
            <li> {menu && menu.name} </li>
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="row">
            {courses.map((course) => (
              <div className="col-md-3">
                <div className="col-course-item">
                  <Link href={`/online/${course._id}`}>
                    <div className="col-course-picture">
                      {course.pictures && course.pictures[0] && (
                        <img src={base.cdnUrl + "/450/" + course.pictures[0]} />
                      )}
                    </div>
                  </Link>
                  <div className="col-course-details">
                    <Link href={`/online/${course._id}`}>
                      <h3> {course.name}</h3>
                    </Link>
                    <div className="col-course-info">
                      <div className="course-info">
                        <FontAwesomeIcon icon={faVideo} /> {course.videoCount}{" "}
                        видео хичээл
                      </div>
                      <div className="course-info">
                        <FontAwesomeIcon icon={faGraduationCap} />{" "}
                        {course.paidMember} сурагчид
                      </div>
                      <div className="course-info">
                        <FontAwesomeIcon icon={faPlay} /> {course.views} үзсэн
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {loader === true && <BlockLoad />}
          {paginate && paginate.nextPage && (
            <div className="pagination">
              <button className="more-page" onClick={() => nextpage()}>
                Дараагийн хуудас
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
