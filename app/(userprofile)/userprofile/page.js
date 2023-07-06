"use client";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotFound from "components/Generals/Notfound";
import { useAuthContext } from "context/authContext";
import base from "lib/base";
import Link from "next/link";

export default function Page() {
  const { user } = useAuthContext();

  if (!user) {
    return <NotFound />;
  } else {
    return (
      <>
        <div className="profile-box">
          <h4> Хувийн мэдээлэл </h4>

          <div className="userData-box">
            <div className="row">
              <div className="col-md-4">
                <div className="pro-box profile-info">
                  <div className="profile">
                    <div className="pic">
                      {user && user.image ? (
                        <img
                          className="pic-img"
                          src={base.cdnUrl + "/" + user.image}
                        />
                      ) : (
                        <img className="pic-img" src="/images/no-avatar.jpeg" />
                      )}
                    </div>
                    <p className="username"> {user && user.firstName} </p>
                    <Link href="/userprofile/info"> Мэдээлэл засах </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6">
                    <Link href="/userprofile/info">
                      <div className="pro-box profile-details">
                        <FontAwesomeIcon icon={faUser} />
                        <h6> Хувийн мэдээлэл </h6>
                        <span> Мэдээлэл засах </span>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <Link href="/userprofile/password">
                      <div className="pro-box  profile-details">
                        <FontAwesomeIcon icon={faLock} />
                        <h6> Нууц үг </h6>
                        <span> Шинэчлэх </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
