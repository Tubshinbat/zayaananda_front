import Link from "next/link";

const Side = () => {
  return (
    <div className="users-side-menu">
      <ul className="user-menu">
        <li>
          <Link href="/userprofile"> Хувийн мэдээлэл </Link>
        </li>
        <span>Захиалга</span>
        <li>
          <Link href="/userprofile/orders"> Захиалгууд </Link>
        </li>
        <li>
          <Link href="/userprofile/orders"> Цаг авалтууд </Link>
        </li>
      </ul>
    </div>
  );
};

export default Side;
