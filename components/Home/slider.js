"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";
import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
} from "swiper";

import base from "lib/base";

import "styles/banner.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/virtual";
import css from "styles/banner.module.css";
import Link from "next/link";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import mn from "javascript-time-ago/locale/mn.json";
TimeAgo.addDefaultLocale(mn);
TimeAgo.addLocale(en);
import { useState, useRef, useEffect } from "react";
import { getBanners } from "lib/banners";

const Slider = () => {
  const [banners, setBanners] = useState([]);

  const [color, setColor] = useState(
    (banners && banners.length > 0 && banners[0].color) || "#fff"
  );
  const videoEl = useRef();

  useEffect(() => {
    const fetchBanner = async () => {
      const { banners } = await getBanners();
      setBanners(banners);
    };

    fetchBanner().catch((error) => console.log(error));

    window.onscroll = () => {
      let header = document.querySelector(".mainHeader");
      if (header) {
        let sticky = header.offsetTop;
        if (window.pageYOffset > sticky) {
          header.classList.add(`headerSticky`);
        } else {
          header.classList.remove(`headerSticky`);
        }
      }
    };
    AOS.init();
  }, []);

  useEffect(() => {
    if (videoEl && videoEl.current) videoEl.current.play();
  }, [banners]);

  return (
    <>
      <div className={`headerArea`}>
        <Swiper
          modules={[EffectFade, Pagination, Navigation, Scrollbar, Autoplay]}
          effect="fade"
          autoplay={{
            delay: 20000,
          }}
          className={css.HomeSlide}
          onSlideChange={(slide) =>
            setColor(banners[slide.activeIndex].color || "#fff")
          }
        >
          {banners &&
            banners.map((banner, index) => {
              return (
                <SwiperSlide key={`banner_${index}`}>
                  <div
                    key={banner._id}
                    className={css.HomeSlideItem}
                    style={{
                      backgroundImage: `url("${base.cdnUrl}/${banner.picture}")`,
                    }}
                    data-color={banner.color}
                  >
                    {banner.type == "video" && banner.video && (
                      <video
                        ref={videoEl}
                        className="background__video"
                        autoplay
                        loop
                        muted
                        src={`${base.cdnUrl}/${banner.video}`}
                      ></video>
                    )}
                    <div className="slider-container">
                      <div className="container">
                        <div className="slider-text">
                          <h2 style={{ color: color }}>{banner.name}</h2>
                          <p style={{ color: color }}> {banner.details}</p>
                          {banner.link && banner.link !== "undefined" && (
                            <Link className="slider-btn" href={banner.link}>
                              {" "}
                              Дэлгэрэнгүй{" "}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
