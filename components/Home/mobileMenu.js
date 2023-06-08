import base from "lib/base";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const MobileMenu = ({ menus, info, socialLinks }) => {
  const [dataMenus, setDataMenus] = useState([]);
  const router = useRouter();
  const [active, setActive] = useState(false);

  const backGo = () => {
    router.back();
  };

  useEffect(() => {
    if (menus) {
      setDataMenus(menus);
    }
  }, [menus]);

  const handleToggle = () => {
    setActive((ba) => {
      if (ba === true) return false;
      else return true;
    });
  };

  return (
    <>
      <div className="burger__menu" onClick={handleToggle}>
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
        <ul>
          {renderMenu(dataMenus)}

          <li>
            <Link href="/contact">Холбоо барих</Link>
          </li>
        </ul>
        <div className="contactMobile">
          <li>
            <a href={`tel:${info.phone}`}> Утас: {info.phone} </a>
          </li>
          <li>
            <a href={`mailto:${info.email}`}> Имэйл: {info.email} </a>
          </li>
          <li>Хаяг: {info.address}</li>
        </div>
        <div className="socialMobile">
          {socialLinks &&
            socialLinks.map((el) => (
              <a href={el.link} key={`${el._id}-som`} target="_blank">
                <i
                  className={`fa-brands fa-${el.name.toLowerCase()}-square`}
                ></i>
              </a>
            ))}
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
