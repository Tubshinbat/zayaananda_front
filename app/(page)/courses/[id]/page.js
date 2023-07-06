"use client";
import {
  faArrowLeft,
  faEye,
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
import { useState, useEffect } from "react";
import { useAuthContext } from "context/authContext";
import { usePayContext } from "context/payContext";
import PayModule from "components/Pay/payModule";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import RandomProduct from "components/Generals/RandomProduct";
import Link from "next/link";

export default function Page({ params: { id } }) {
  const [course, setCourse] = useState(null);
  const [more, setMore] = useState(false);
  const [selectData, setSelectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { checkCourse, clear, userData, setIsCourse } = useAuthContext();
  const {
    createQpayAndInvoice,
    invoice,
    notification,
    error,
    visible,
    setVisible,
    qpay,
    isPaid,
    init,
  } = usePayContext();

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { course } = await getCourse(id);
      if (course) {
        setCourse(course);
      }
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (userData) {
      checkCourse(id);
    }
  }, [userData]);

  useEffect(() => {
    if (error) {
      toastControl("error", error);
    }
  }, [error]);

  useEffect(() => {
    if (notification) {
      toastControl("success", notification);
    }
  }, [notification]);

  useEffect(() => {
    if (isPaid === true) {
      toastControl("success", "Сургалтыг идэвхжүүллээ .");
      setIsCourse(true);
      setVisible(false);
    }
  }, [isPaid]);

  const payCourse = () => {
    setVisible(true);
    if (invoice === null) {
      const data = {
        sender_invoice_no: null,
        sender_branch_code: "course",
        invoice_description: `${userData.phoneNumber} хэрэглэгч ${course.name} төлбөр илгээв`,
        amount: course.price,
        course: course._id,
        userId: userData._id,
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
                <Link href="/courses"> Онлайн сургалтууд </Link>
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
                      <h4> {new Intl.NumberFormat().format(course.price)}₮ </h4>
                    </div>
                    <div className="divider-dashed"> </div>
                    <div className="video-infos">
                      <div className="video-info-item">
                        <FontAwesomeIcon icon={faEye} /> {course.views} Үзсэн
                      </div>
                      <div className="video-info-item">
                        <FontAwesomeIcon icon={faGraduationCap} />
                        Дүүргэлт: {course.classCount}
                      </div>
                      <div className="video-info-item">
                        <FontAwesomeIcon icon={faClock} />
                        Эхлэх огноо: {course.startDate}
                      </div>
                    </div>
                  </div>
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
