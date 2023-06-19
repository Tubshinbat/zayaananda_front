"use client";

import NotFound from "components/Generals/Notfound";
import { useAuthContext } from "context/authContext";
import base from "lib/base";
import Link from "next/link";

export default function Page() {
  const { userData } = useAuthContext();

  if(userData){
    return <NotFound />
  }else{

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
                    {userData && userData.image ? (
                      <img
                        className="pic-img"
                        src={base.cdnUrl + "/" + userData.image}
                      />
                    ) : (
                      <img className="pic-img" src="/images/no-avatar.jpeg" />
                    )}
                    
                  </div>
                  <p className="username"> {userData && userData.firstName} </p>
                  <Link href="/userprofile/info"> Мэдээлэл засах </Link>
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
