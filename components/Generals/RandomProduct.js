"use client";
import Link from "next/link";
import { getRandomProducts } from "lib/product";
import base from "lib/base";
import { useEffect, useState } from "react";

const RandomProduct = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { products } = await getRandomProducts();
      if (products) setProducts(products);
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="container">
        <h4 class="pageDetailsSubTitle"> Санал болгох бүтээгдэхүүнүүд </h4>
        <div className="row product-list">
          {products &&
            products.map((product, index) => (
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
      </div>
    </>
  );
};

export default RandomProduct;
