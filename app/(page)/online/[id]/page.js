"use client";
import {
  faArrowLeft,
  faPlay,
  faVideo,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import Share from "components/Generals/Share";

import base from "lib/base";
import { getCourse } from "lib/course";
import { toastControl } from "lib/toastControl";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { useAuthContext } from "context/authContext";
import { usePayContext } from "context/payContext";
import PayModule from "components/Pay/payModule";
import Link from "next/link";
import { getRandomProducts } from "lib/product";
import RandomProduct from "components/Generals/RandomProduct";

export default function Page({ params: { id } }) {
  const [course, setCourse] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [more, setMore] = useState(false);
  const [selectData, setSelectData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { checkCourse, isCourse, user, setIsCourse } = useAuthContext();
  const {
    createQpayAndInvoice,
    invoice,
    visible,
    setVisible,
    qpay,
    isPaid,
    paymentInit,
    setIsPaid,
  } = usePayContext();

  const router = useRouter();

  useEffect(() => {
    paymentInit();
    checkCourse(id);
    const fetchData = async () => {
      const { course } = await getCourse(id);

      if (course) {
        setCourse(course);
        if (course.courses && course.courses.length > 0) {
          setCourseList(course.courses);
        }
      }

      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
    return () => {
      paymentInit();
    };
  }, []);

  useEffect(() => {
    if (isPaid === true) {
      toastControl("success", "Сургалтыг идэвхжүүллээ .");
      setIsCourse(true);
      setVisible(false);
    }
  }, [isPaid]);

  useEffect(() => {
    if (course) {
      if (
        (course.isDiscount == true && course.discount === 0) ||
        (course.isDiscount == false && course.price === 0)
      ) {
        setIsCourse(true);
        setIsPaid(true);
      }
    }
  }, [course]);

  const payCourse = () => {
    setVisible(true);
    if (invoice === null) {
      const data = {
        sender_invoice_no: null,
        sender_branch_code: "course",
        invoice_description: `${user.phoneNumber} хэрэглэгч ${course.name} төлбөр илгээв`,
        amount: course.isDiscount === true ? course.discount : course.price,
        course: course._id,
        userId: user._id,
      };
      createQpayAndInvoice(data);
    }
  };

  if (!course) {
    if (loading == true) {
      return (
        <section>
          <div className="container">
            <Loader />
          </div>{" "}
        </section>
      );
    } else if (!course && loading == false) {
      return <NotFound />;
    }
  } else {
    return (
      <>
        <div
          className="pageDetailsHeader"
          style={{
            background:
              course && course.pictures && course.pictures[1]
                ? `url("${base.cdnUrl}/${course.pictures[1]}")`
                : `url(/images/header.jpg)`,
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <h2> {course && course.name} </h2>
            <div className="bread">
              <li>
                <Link href="/"> Нүүр </Link>
              </li>
              <span> /</span>
              <li>
                <Link href="/online"> Онлайн сургалтууд </Link>
              </li>
              <span> /</span>
              <li> {course && course.name} </li>
            </div>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="page_detials_header">
                  <div className="page_header_left">
                    <button className="page-back" onClick={() => router.back()}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <h2>{course.name}</h2>
                  </div>
                </div>
                <div className="cover_video_box">
                  {!selectData && course.pictures && course.pictures[0] && (
                    <img src={base.cdnUrl + "/" + course.pictures[0]} />
                  )}
                  {selectData && selectData.video && (
                    <video
                      src={`${base.apiUrl}/lessons/video/${selectData.video}`}
                      controls
                    ></video>
                  )}
                </div>
                {selectData && <h4> {selectData.name} </h4>}
                <Share shareUrl={base.baseUrl + "online/" + course._id} />
                <div className="desc-title"> Дэлгэрэнгүй </div>
                <div className="page_details">
                  <div
                    className={`description ${more === true && "more"}`}
                    dangerouslySetInnerHTML={{
                      __html: course.details,
                    }}
                  ></div>
                  {course.details.toString().length > 200 && (
                    <p
                      className="detialsMore"
                      onClick={() =>
                        setMore((bm) => {
                          if (bm === true) {
                            return false;
                          } else return true;
                        })
                      }
                    >
                      {more === false ? "Цааш унших" : "Хураах"}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="page_sides sticky-top">
                  <div className="details-box">
                    <div className="price-box">
                      <span> Үндсэн үнэ: </span>
                      {course.isDiscount == true && (
                        <h4>
                          {new Intl.NumberFormat().format(course.discount)}₮{" "}
                          <span>
                            {" "}
                            {new Intl.NumberFormat().format(course.price)}₮{" "}
                          </span>
                        </h4>
                      )}

                      {course.isDiscount == false && (
                        <h4>
                          {new Intl.NumberFormat().format(course.price)}₮{" "}
                        </h4>
                      )}
                    </div>
                    <div className="divider-dashed"> </div>
                    <div className="video-infos">
                      <div className="video-info-item">
                        <FontAwesomeIcon icon={faVideo} /> {course.videoCount}{" "}
                        Видео хичээл
                      </div>
                      <div className="video-info-item">
                        <FontAwesomeIcon icon={faPlay} /> {course.views} Үзсэн
                      </div>
                      <div className="video-info-item">
                        <FontAwesomeIcon icon={faGraduationCap} />{" "}
                        {course.paidMember} сурагчид
                      </div>
                    </div>
                  </div>
                  {course.type === "online" && !user && (
                    <button
                      className="btn-booking"
                      onClick={() => router.push("/login")}
                    >
                      Нэвтрэх
                    </button>
                  )}

                  {course.type === "online" && user && isCourse === false && (
                    <button className="btn-booking" onClick={payCourse}>
                      Худалдаж авах
                    </button>
                  )}

                  {course.type === "online" && (
                    <div className="online-course-list">
                      <div className="online-course-list-header">
                        <h4>Холбогдох сургалтууд</h4>
                      </div>
                      {courseList.length > 0 &&
                        courseList.map((el) => (
                          <li
                            onClick={() =>
                              user && isCourse === true && setSelectData(el)
                            }
                            className={
                              selectData &&
                              selectData._id === el._id &&
                              "active"
                            }
                          >
                            {el.name}
                          </li>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <RandomProduct />
        </section>
        {visible === true && (
          <PayModule visible={visible} invoice={invoice} qpay={qpay} />
        )}
      </>
    );
  }
}
