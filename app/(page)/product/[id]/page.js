"use client";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import Share from "components/Generals/Share";
import { useAuthContext } from "context/authContext";
import { useCartContext } from "context/cartContext";
import base from "lib/base";
import { getProduct } from "lib/product";
import { toastControl } from "lib/toastControl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import ImageGallery from "react-image-gallery";

export default async function Page({ params: { id } }) {
  const router = useRouter();
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [more, setMore] = useState(false);
  const { cartAdd, cart } = useCartContext();
  const { user } = useAuthContext();
  const countRef = useRef(1);

  useEffect(() => {
    const fetchData = async () => {
      const { product } = await getProduct(id);
      if (product) {
        setData(product);
        const img = [];
        product.pictures &&
          product.pictures.map((picture) => {
            img.push({
              original: base.cdnUrl + "/" + picture,
              thumbnail: base.cdnUrl + "/150x150/" + picture,
            });
          });
        setImage(img);
      }
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  const handleCart = () => {
    if (data && user) {
      const price =
        countRef.current * parseInt(data.discount ? data.discount : data.price);
      const qtyPrice = parseInt(data.discount ? data.discount : data.price);

      const cartData = {
        productInfo: data._id,
        picture: data.pictures[0],
        name: data.name,
        qty: countRef.current,
        qtyPrice,
        price,
      };

      cartAdd(cartData);
    } else {
      toastControl("error", "Нэвтэрч орно уу");
    }
  };

  const handlePay = () => {
    if (data && user) {
      const price =
        countRef.current * parseInt(data.discount ? data.discount : data.price);
      const qtyPrice = parseInt(data.discount > 0 ? data.discount : data.price);

      const cartData = {
        productInfo: data._id,
        picture: data.pictures[0],
        name: data.name,
        qty: countRef.current,
        qtyPrice,
        price,
      };

      cartAdd(cartData);
      router.push("/cart");
    } else {
      toastControl("error", "Нэвтэрч орно уу");
    }
  };

  const handleChange = (event) => {
    countRef.current = event.target.value;
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
            background: `url(/images/header.jpg)`,
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <h2> {data && data.name} </h2>
            <div className="bread">
              <li>
                <Link href="/"> Нүүр </Link>
              </li>
              <span> /</span>
              <li>
                <Link href="/shop"> Дэлгүүр </Link>
              </li>
              <span> /</span>
              <li> {data && data.name} </li>
            </div>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="page_detials_header">
                  <div className="page_header_left">
                    <button className="page-back" onClick={() => router.back()}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <h2>{data.name}</h2>
                  </div>
                </div>
                <div className="productGallery">
                  <ImageGallery items={image} />
                </div>
                <Share shareUrl={base.baseUrl + "product/" + data._id} />
                <div className="desc-title"> Дэлгэрэнгүй </div>
                <div className="page_details">
                  <div
                    className={`description ${more === true && "more"}`}
                    dangerouslySetInnerHTML={{
                      __html: data.details,
                    }}
                  ></div>
                  {data.details.toString().length > 300 && (
                    <p
                      className="detialsMore"
                      onClick={() =>
                        setMore((bm) => {
                          if (bm === true) {
                            return false;
                          } else return true;
                        })
                      }
                    >
                      {more === false ? "Цааш унших" : "Хураах"}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="page_sides sticky-top">
                  <div className="details-box">
                    <div className="price-box">
                      <span> Үндсэн үнэ: </span>
                      {data.discount > 0 && (
                        <h4>
                          {new Intl.NumberFormat().format(data.discount)}₮{" "}
                          <span>
                            {" "}
                            {new Intl.NumberFormat().format(data.price)}₮{" "}
                          </span>
                        </h4>
                      )}

                      {data.discount <= 0 && (
                        <h4>{new Intl.NumberFormat().format(data.price)}₮ </h4>
                      )}
                    </div>
                  </div>
                  <div className="divider-dashed"> </div>
                  <div className="qty">
                    <p> Тоо ширхэг </p>
                    <input
                      type="number"
                      name="qty"
                      min="1"
                      max="100"
                      defaultValue={1}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="cartBtns">
                    <button className="btnCart" onClick={handleCart}>
                      Сагсанд нэмэх
                    </button>
                    <button className="btnBuy" onClick={handlePay}>
                      Худалдан авах
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
