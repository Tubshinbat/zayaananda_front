"use client";

import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import base from "lib/base";
import { getMenu } from "lib/menus";
import { getProducts } from "lib/product";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setDatas] = useState([]);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { products } = await getProducts(`status=true`);
      const { menu } = await getMenu(`direct=services`);
      if (products) setDatas(products);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  if (!data) {
    if (loading === true) {
      return (
        <section>
          <div className="container">
            <Loader />
          </div>{" "}
        </section>
      );
    } else {
      <section>
        <NotFound />
      </section>;
    }
  } else {
    return (
      <>
        <div
          className="pageDetailsHeader"
          style={{
            background:
              menu && menu.cover && menu.cover !== ""
                ? `url("${base.cdnUrl}/${menu.cover}")`
                : `/images/header.jpg`,
                backgroundSize: "cover"
          }}
        >
          <div className="container">
            <h2> Дэлгүүр </h2>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row product-list">
              {data &&
                data.map((product, index) => (
                  <div
                    className=" col-lg-3 col-md-3 col-sm-4 col-6 col-md-2-5 "
                    key={`product_${index}`}
                  >
                    <div className="productItem">
                      <Link href={`/product/${product._id}`}>
                        <div
                          className="productImage"
                          style={{
                            backgroundImage: `url(${base.cdnUrl}/${product.pictures[0]})`,
                          }}
                        ></div>
                      </Link>
                      <div className="productMore">
                        <h4> {product.name} </h4>

                        {product.discount > 0 ? (
                          <div className="productDiscount">
                            <p className="productDiscountPrice">
                              {new Intl.NumberFormat().format(product.discount)}
                              {product.priceVal}₮
                            </p>
                            <p className="productOldPrice">
                              {new Intl.NumberFormat().format(product.price)}
                              {product.priceVal}₮
                            </p>
                          </div>
                        ) : (
                          <p className="productPrice">
                            {new Intl.NumberFormat().format(product.price)}
                            {product.priceVal}₮
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </>
    );
  }
}
