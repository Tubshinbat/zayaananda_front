"use client";

import BlockLoad from "components/Generals/BlockLoad";
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
  const [paginate, setPaginate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { products, pagination } = await getProducts(`status=true`);
      const { menu } = await getMenu(`direct=shop`);
      setMenu(menu);
      if (products) {
        setDatas(products);
        setPaginate(pagination);
      }
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  const nextpage = () => {
    const next = async () => {
      const { products, pagination } = await getProducts(
        `status=true&page=${paginate.nextPage}`
      );
      setDatas((bs) => [...bs, ...products]);
      setPaginate(pagination);
      setLoading(false);
    };

    if (paginate && paginate.nextPage) {
      setLoading(true);
      next().catch((error) => console.log(error));
    }
  };

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
                : `url(/images/header.jpg)`,
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <h2> Дэлгүүр </h2>
            <div className="bread">
              <li>
                <Link href="/"> Нүүр </Link>
              </li>
              <span> /</span>
              <li> {menu && menu.name} </li>
            </div>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row product-list">
              {data &&
                data.map((product, index) => (
                  <div
                    className=" col-lg-2 col-md-3 col-sm-4 col-6 "
                    key={`product_${index}`}
                  >
                    <div className="productItem">
                      <Link href={`/product/${product._id}`}>
                        <div className="productImage">
                          <img
                            src={`${base.cdnUrl}/350x350/${product.pictures[0]}`}
                          />
                        </div>
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
            {loading === true && <BlockLoad />}
            {paginate && paginate.nextPage && (
              <div className="pagination">
                <button className="more-page" onClick={() => nextpage()}>
                  Дараагийн хуудас
                </button>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }
}
