"use client";
import axios from "axios-base";
import base from "lib/base";
import { getOrders } from "lib/order";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const [data, setData] = useState([]);
  const [paginate, setPaginate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("bookings/user");
      console.log(result);
      if (result) {
        setData(result.data.data);
        setPaginate(result.data.pagination);
      }
    };
    fetchData().catch((err) => console.log(err));
  }, []);

  const nextpage = () => {
    const next = async () => {
      const result = await axios.get(`bookings/user?page=${paginate.nextPage}`);

      if (result) {
        setData((bs) => [...bs, ...result.data.data]);
        setPaginate(result.data.pagination);
      }
    };

    if (paginate && paginate.nextPage) {
      next().catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="profile-box">
        <h4> Цаг авалт </h4>
      </div>
      <div className="order-list">
        {data &&
          data.map((el, index) => {
            let type = "";

            const currentDate = new Date().toJSON().slice(0, 10);
            let createAt = el.createAt && el.createAt.slice(0, 10);

            if (el.paid === true) {
              type = "Төлбөр төлөгдсөн ";
            } else if (el.paid === false && createAt < currentDate) {
              type = "Захиалга цуцлагдсан";
            } else if (el.paid === false) {
              type = "Төлбөр төлөгдөөгүй";
            } else {
              type = "Төлбөр төлөгдөөгүй";
            }

            return (
              <div className="choise-service orderList">
                <div className="choise-img">
                  {el.service && (
                    <img
                      src={base.cdnUrl + "/150x150/" + el.service.pictures[0]}
                    />
                  )}
                </div>
                <div className="choise-service-detials">
                  <div className="choise-title">
                    <span> Бүтээгдэхүүн </span>
                    <h6>{el.service && el.service.name}</h6>
                    <span> Төлөв : {type}</span>
                    <span>
                      Авсан цаг: {el.date.slice(0, 10) + " - " + el.time}
                    </span>
                    <span>Огноо: {createAt}</span>
                  </div>
                  <div className="cart-p-controls">
                    <p className="choise-service-price">
                      {el.service &&
                        new Intl.NumberFormat().format(el.service.price)}
                      ₮{" "}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        {paginate && paginate.nextPage && (
          <div className="pagination">
            <button className="more-page" onClick={() => nextpage()}>
              Дараагийн хуудас
            </button>
          </div>
        )}
      </div>
    </>
  );
}
