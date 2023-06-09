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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faClock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import base from "lib/base";
import { htmlToText } from "html-to-text";
import { useEffect } from "react";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);

const PageDetails = ({ page }) => {
  const nf = new Intl.NumberFormat();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="pageDetailsHeader">
        <div className="container">
          <h2> {page.name} </h2>
        </div>
      </div>
      <section className="pageDetails">
        <div className="container">
          {page && (
            <div className="row">
              <div className="col-lg-4">
                <div className="page_sides">
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
                  <div className="page_price">
                    Үйлчилгээний хөлс: {nf.format(page.price)}
                  </div>
                  <div className="page_booking_time">
                    <h4> Цаг авах </h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="page_details">
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: page.details,
                    }}
                  ></div>
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
