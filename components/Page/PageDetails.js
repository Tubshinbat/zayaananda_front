"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "styles/banner.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { Navigation } from "swiper";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";

import Link from "next/link";
import base from "lib/base";

import { useEffect, useState } from "react";
import Share from "components/Share";
import { useBookingContext } from "context/bookingContext";
import { useRouter } from "next/navigation";

TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const PageDetails = ({ page }) => {
  const router = useRouter();
  const [more, setMore] = useState(false);
  const { setService } = useBookingContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBooking = () => {
    setService(page._id);
    router.refresh("");
  };

  return (
    <>
      <div className="pageDetailsHeader">
        <div className="container">
          <span> Zaya's ananda</span>
          <h2> {page.name} </h2>
        </div>
      </div>
      <section className="pageDetails">
        <div className="container">
          {page && (
            <div className="row">
              <div className="col-lg-8">
                <div className="page_detials">
                  <div className="page_images" style={{ width: "100%" }}>
                    {page.pictures && page.pictures.length === 1 && (
                      <img src={`${base.cdnUrl}/${page.pictures[0]}`} />
                    )}
                    {page.pictures && page.pictures.length > 1 && (
                      <Swiper
                        modules={[Navigation]}
                        autoHeight={true}
                        navigation={{
                          prevEl: ".newsViewSlider__prev",
                          nextEl: ".newsViewSlider__next",
                        }}
                        className="newsViewSlider"
                      >
                        {page.pictures.map((pic, index) => (
                          <SwiperSlide
                            className="newsViewSlide"
                            key={index + "nview"}
                          >
                            <img src={`${base.cdnUrl}/${pic}`} />
                          </SwiperSlide>
                        ))}
                        <div className="newsViewSlide__nav">
                          <div className="newsViewSlider__prev swiper-button-prev"></div>
                          <div className="newsViewSlider__next swiper-button-next"></div>
                        </div>
                      </Swiper>
                    )}
                  </div>
                  <Share shareUrl={base.baseUrl + "service/" + page._id} />
                  <div className="desc-title"> Дэлгэрэнгүй </div>
                  <div className="page_details">
                    <div
                      className={`description ${more === true && "more"}`}
                      dangerouslySetInnerHTML={{
                        __html: page.details,
                      }}
                    ></div>
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
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="page_sides sticky-top">
                  <div className="details-box">
                    <div className="price-box">
                      <span> Үндсэн үнэ: </span>
                      <h4> {new Intl.NumberFormat().format(page.price)}₮ </h4>
                    </div>
                    <div className="divider-dashed"> </div>
                    <div className="details-list">
                      <li>
                        <i className="fa fa-eye"></i>
                        {page.views} хүн үзсэн
                      </li>
                    </div>
                  </div>
                  <button
                    className="btn-booking"
                    onClick={() => handleBooking()}
                  >
                    Цаг захиалах
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default PageDetails;
