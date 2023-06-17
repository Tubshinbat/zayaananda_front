"use client";
import base from "lib/base";
import { getMenus } from "lib/menus";
import { getSocials } from "lib/socialLinks";
import { getWebInfo } from "lib/webinfo";
import Link from "next/link";
import { useEffect, useState } from "react";

export default () => {
  const [phoneNumber, setPhoneNumber] = useState([]);

  const [info, setInfo] = useState({});
  const [menus, setMenus] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    if (info.phone) {
      const phones = info.phone.split(",");
      setPhoneNumber(phones);
    }
  }, [info]);

  useEffect(() => {
    const fetchDatas = async () => {
      const { webInfo } = await getWebInfo();
      const { menus } = await getMenus();
      const { socialLinks } = await getSocials();
      setInfo(webInfo);
      setMenus(menus);
      setSocialLinks(socialLinks);
    };

    fetchDatas().catch((err) => console.log(err));
  }, []);

  const renderCategories = (categories, child = false, parentSlug = "") => {
    let myCategories = [];
    categories &&
      categories.map((el, index) => {
        let dly = 0.2 * index;
        myCategories.push(
          <div
            key={el._id}
            className={`${
              !child && "col-lg-3"
            } wow animate__animated animate__fadeInDown`}
            data-wow-delay={`${dly}s`}
          >
            {!child && <div className="footerTitle">{el.name}</div>}

            {!el.isDirect && !el.model && child && (
              <Link href={`/page/${el.slug}`}>{el.name}</Link>
            )}

            {el.isDirect && child && (
              <a href={el.direct} target="_blank">
                {el.name}
              </a>
            )}

            {el.model && child && <Link href={`/${el.model}`}>{el.name}</Link>}
            {el.children.length > 0 && !child ? (
              <ul>{renderCategories(el.children, true, el.slug)}</ul>
            ) : null}
          </div>
        );
      });

    return myCategories;
  };

  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div
              className="col-lg-3 wow animate__animated animate__fadeInDown"
              data-wow-delay="0.8s"
            >
              <div className="footer-about">
                {info.whiteLogo && (
                  <Link href="/">
                    <img src={`${base.cdnUrl}/${info.whiteLogo}`} />
                  </Link>
                )}
                <p className="footerDescription">{info.siteInfo}</p>
              </div>
            </div>
            <div
              className="col-lg-3 wow animate__animated animate__fadeInDown"
              data-wow-delay="1.2s"
            >
              <div className="footerTitle">Туслах цэс</div>
              <div className="footerContacts">
                <li>
                  <a href="/"> Нүүр </a>
                </li>
                <li>
                  <a href="/services/"> Үйлчилгээ </a>
                </li>
                <li>
                  <a href="/courses/"> Сургалт </a>
                </li>
                <li>
                  <a href="/abouts/"> Бидний тухай </a>
                </li>
              </div>
            </div>
            <div
              className="col-lg-3 wow animate__animated animate__fadeInDown"
              data-wow-delay="1.2s"
            >
              <div className="footerTitle">Холбоо барих</div>
              <div className="footerContacts">
                <li>
                  <a href={`tel:${phoneNumber && phoneNumber[0]}`}>
                    Утас: {info.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${info.email}`}> Имэйл: {info.email} </a>
                </li>
                <li>Хаяг: {info.address}</li>
              </div>
            </div>

            <div
              className="col-lg-3 wow animate__animated animate__fadeInDown"
              data-wow-delay="1.4s"
            >
              <div className="socialsLinks">
                {socialLinks &&
                  socialLinks.map((el) => (
                    <a href={el.link} target="_blank" key={`${el._id}-social`}>
                      <i
                        className={`fa-brands fa-${el.name.toLowerCase()}`}
                      ></i>
                      {el.name.toLowerCase()}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          © {new Date().getFullYear()} он бүх эрх хуулиар хамгаалагдсан
        </div>
      </footer>
    </>
  );
};
