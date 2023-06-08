import Loading from "app/loading";
import { Suspense, use } from "react";
import { htmlToText } from "html-to-text";
import NotFound from "components/NotFound";
import base from "lib/base";
import { getNews } from "lib/news";
import { getProducts } from "lib/product";

export default async function Page() {
  const { products } = await getProducts(`status=true`);

  return (
    <div>
      <main>
        <div className="pageDetailsHeader">
          <div className="container">
            <h2> Бүтээгдэхүүнүүд </h2>
          </div>
        </div>
        <section>
          <div className="container">
            
              <Suspense fallback={<Loading />}>
                  <div className="row product-list">
            {products &&
              products.map((product, index) => (
                <div
                  className=" col-lg-2 col-md-3 col-sm-4 col-6  "
                  data-wow-delay={`${index * 0.2}s`}
                >
                  <div className="productItem">
                    <a href={`/product/${product._id}`}>
                      <div
                        className="productImage"
                        style={{
                          backgroundImage: `url(${base.cdnUrl}/${product.pictures[0]})`,
                        }}
                      ></div>
                    </a>
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
              </Suspense>

              {products && products.length <= 0 && (
                <>
                  <NotFound />
                </>
              )}
           
          </div>
        </section>
      </main>
    </div>
  );
}
