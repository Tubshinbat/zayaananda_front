import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBook,
  faBox,
  faBoxesAlt,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Side = () => {
  return (
    <div className="users-side-menu">
      <ul className="user-menu">
        <li>
          <Link href="/userprofile">
            <FontAwesomeIcon icon={faUser} /> Хувийн мэдээлэл{" "}
          </Link>
        </li>
        <span>Захиалга</span>
        <li>
          <Link href="/userprofile/orders">
            <FontAwesomeIcon icon={faBoxesAlt} /> Захиалгууд{" "}
          </Link>
        </li>
        <li>
          <Link href="/userprofile/booking">
            <FontAwesomeIcon icon={faClock} /> Цаг авалтууд{" "}
          </Link>
        </li>
        <li>
          <Link href="/userprofile/courses">
            <FontAwesomeIcon icon={faBook} />
            Сургалтууд
          </Link>
        </li>
        <span></span>
        <li>
          <Link href="/logout">
            {" "}
            <FontAwesomeIcon icon={faRightFromBracket} />
            Системээс гарах
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Side;
