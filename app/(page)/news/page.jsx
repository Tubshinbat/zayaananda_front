import Loading from "app/loading";
import { Suspense, use } from "react";
import { htmlToText } from "html-to-text";
import NotFound from "components/NotFound";
import base from "lib/base";
import { getNews } from "lib/news";

export default async function Page() {
  const { news } = await getNews(`status=true`);

  return (
    <div>
      <main>
        <div className="pageDetailsHeader">
          <div className="container">
            <h2> Зөвлөгөө </h2>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <Suspense fallback={<Loading />}>
                {news &&
                  news.map((el) => (
                    <div className="col-lg-4">
                      <div className="serivce-col">
                        <div className="service-col-img">
                          <img src={`${base.cdnUrl}/${el.pictures[0]}`} />
                        </div>
                        <div className="service-col-content">
                          <a href={`/post/${el._id}`}>
                            <h4> {el.name} </h4>
                          </a>
                          <p>
                            {htmlToText(el.details, {
                              limits: 10,
                            }).length > 240
                              ? htmlToText(el.details, {
                                  limits: 10,
                                }).substr(0, 240) + "..."
                              : htmlToText(el.details, {
                                  limits: 10,
                                })}
                          </p>
                          <a href={`/post/${el._id}`} className="more-btn">
                            {" "}
                            Дэлгэрэнгүй{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </Suspense>

              {news && news.length <= 0 && (
                <>
                  <NotFound />
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
