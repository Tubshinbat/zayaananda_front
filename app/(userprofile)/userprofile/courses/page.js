"use client";
import axios from "axios-base";
import { useAuthContext } from "context/authContext";
import base from "lib/base";
import { getOrders } from "lib/order";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const { user } = useAuthContext();

  return (
    <>
      <div className="profile-box">
        <h4> Захиалгууд </h4>
      </div>
      <div className="order-list">
        {user &&
          user.courses.map((el, index) => {
            let type = "";

            let createAt = el.createAt && el.createAt.slice(0, 10);

            return (
              <div className="choise-service orderList">
                <div className="choise-img">
                  {el.pictures && (
                    <img src={base.cdnUrl + "/150x150/" + el.pictures[0]} />
                  )}
                </div>
                <div className="choise-service-detials">
                  <div className="choise-title">
                    <span> Бүтээгдэхүүн </span>
                    <h6>{el.name}</h6>
                    <span> Төлөв : Худалдаж авсан </span>
                    <span>
                      Үзэх : <Link href={`/online/${el._id}`}>Энд дар</Link>на
                      уу{" "}
                    </span>
                  </div>
                  <div className="cart-p-controls">
                    <p className="choise-service-price">
                      {new Intl.NumberFormat().format(el.price)}₮
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
