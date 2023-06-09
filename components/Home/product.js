import base from "lib/base";
import Link from "next/link";

const Products = ({ products }) => {
  return (
    <>
      <section>
        <div className="container">
          <div className="sectionHeader center">
            <div className="sectionTitle">
              <p className="sectionSub"> Zaya's Ananda</p>
              <h3 className="white">
                Манай <span> бүтээгдэхүүнүүд </span>
              </h3>
            </div>
          </div>
          <div className="row product-list">
            {products &&
              products.map((product, index) => (
                <div
                  className=" col-lg-3 col-md-3 col-sm-4 col-6 col-md-2-5 "
                  data-wow-delay={`${index * 0.2}s`}
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
          <a href="/products" className="product-more-btn">
            Бүх бүтээгдэхүүндийг харах
          </a>
        </div>
      </section>
    </>
  );
};

export default Products;