import base from "lib/base";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMenuContext } from "context/menuContext";
import { useWebInfoContext } from "context/webinfoContext";

const renderMenu = (categories) => {
  let myCategories = [];
  categories &&
    categories.map((el) => {
      myCategories.push(
        <li key={el._id}>
          {!el.isDirect && !el.model && (
            <a href={`/page/${el.slug}`}>{el.name}</a>
          )}
          {el.isDirect && (
            <a href={el.direct} target="_blank">
              {el.name}
            </a>
          )}
          {el.model && <a href={`/${el.model}`}>{el.name}</a>}
        </li>
      );
    });

  return myCategories;
};

const MobileMenu = () => {
  const { info } = useWebInfoContext();
  const { menus } = useMenuContext();

  const router = useRouter();
  const [active, setActive] = useState(false);

  const backGo = () => {
    router.back();
  };

  const handleToggle = () => {
    setActive((ba) => {
      if (ba === true) return false;
      else return true;
    });
  };

  return (
    <>
      <div className="burger-menu" onClick={handleToggle}>
        <span className="line"> </span>
        <span className="line"> </span>
        <span className="line"> </span>
      </div>
      <div
        className={`menuMobile  ${
          active === true ? "displayBlock" : "displayNone"
        }`}
      >
        <h5>
          <i className="fa-solid fa-xmark" onClick={handleToggle}></i> Үндсэн
          цэс
        </h5>
        <ul>{menus}</ul>
        <div className="contactMobile">
          <li>
            <a href={`tel:${info.phone}`}> Утас: {info.phone} </a>
          </li>
          <li>
            <a href={`mailto:${info.email}`}> Имэйл: {info.email} </a>
          </li>
          <li>Хаяг: {info.address}</li>
        </div>
      </div>
      <div
        className={`menuMobile-bg ${
          active === true ? "displayBlock" : "displayNone"
        }`}
        onClick={handleToggle}
      ></div>
    </>
  );
};

export default MobileMenu;
