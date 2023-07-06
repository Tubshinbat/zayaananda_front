"use client";
import base from "lib/base";
import { getProducts } from "lib/product";
import Link from "next/link";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { products } = await getProducts(`status=true&limit=8`);
      setProducts(products);
    };

    fetchProducts().catch((error) => console.log(error));
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className="sectionHeader center">
            <div className="sectionTitle">
              <p className="sectionSub"> Zaya's Ananda</p>
              <h3 className="">
                Манай <span> бүтээгдэхүүнүүд </span>
              </h3>
            </div>
          </div>
          <div className="row product-list">
            {products &&
              products.map((product, index) => (
                <div
                  className=" col-lg-3 col-md-3 col-sm-4 col-6 "
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
          <Link href="/shop" className="product-more-btn">
            Бүх бүтээгдэхүүндийг харах
          </Link>
        </div>
      </section>
    </>
  );
};

export default Products;
