import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="notFound">
            <FontAwesomeIcon icon={faInbox} />
            <h2> Та үйлчилгээ </h2>
            <p> сонгоогүй байна</p>
            <Link href="/services"> Үйлчилгээнүүд дээр очих</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
