"use client";
import { faClock, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import Share from "components/Generals/Share";
import NotFound from "components/Service/notFound";
import base from "lib/base";
import { getContent } from "lib/news";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params: { id } }) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNews = async () => {
      const { news } = await getContent(id);
      if (news) setNews(news);
      setLoading(false);
    };

    fetchNews().catch((error) => console.log(error));
  }, []);

  if (!news) {
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
              news && news.pictures && news.pictures[1]
                ? `url("${news.cdnUrl}/${news.pictures[1]}")`
                : `url(/images/header.jpg)`,
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <h2> {news && news.name} </h2>
            <div className="bread">
              <li>
                <Link href="/"> Нүүр </Link>
              </li>
              <span> /</span>
              <li>
                <Link href="/news"> Зөвлөгөө, мэдээлэл </Link>
              </li>
              <span> /</span>
              <li> {news && news.name} </li>
            </div>
          </div>
        </div>
        <section>
          <div className="container news-container">
            <div className="news-box">
              <div className="news-box-header">
                <h2>{news.name}</h2>
                <div className="news-item-info">
                  <div className="news-item-info-item">
                    <FontAwesomeIcon icon={faClock} />
                    {news.createAt.slice(0, 10)}
                  </div>
                  <div className="news-item-info-item">
                    <FontAwesomeIcon icon={faEye} />
                    {news.views}
                  </div>
                </div>
              </div>
              <div className="news-item-img">
                {news.pictures && (
                  <img src={base.cdnUrl + "/" + news.pictures[0]} />
                )}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: news.details,
                }}
                className="newsDescription"
              ></div>
              <Share shareUrl={base.baseUrl + "news/" + news._id} />
            </div>
          </div>
        </section>
      </>
    );
  }
}
