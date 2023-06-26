"use client";

import { faClock, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getMenu } from "lib/menus";
import { getNews } from "lib/news";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { menu } = await getMenu(`direct=news`);
      const { news, pagination } = await getNews(`status=true`);
      setPagination(pagination);
      setData(news);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div
        className="pageDetailsHeader"
        style={{
          backgroundImage:
            menu && menu.cover && menu.cover !== ""
              ? `url("${base.cdnUrl}/${menu.cover}")`
              : `/images/header.jpg`,
        }}
      >
        <div className="container">
          <h2> Зөвлөгөө </h2>
        </div>
      </div>
      <section>
        <div className="container">
          {loading === true && <Loader />}
          {data && data[0] && (
            <div className="starNews">
              <div className="starTitle">
                <Link href={`/news/${data[0]._id}`}>
                  {data[0] && data[0].name}
                </Link>
              </div>
              <div className="starInfo">
                <div className="starInfoItem">
                  <FontAwesomeIcon icon={faClock} />
                  {data[0].createAt.slice(0, 10)}
                </div>
                <div className="starInfoItem">
                  <FontAwesomeIcon icon={faEye} />
                  {data[0].views}
                </div>
              </div>

              <div className="starImage">
                <Link href={`/news/${data[0]._id}`}>
                  {data[0].pictures[0] && (
                    <img src={base.cdnUrl + "/" + data[0].pictures[0]} />
                  )}
                </Link>
              </div>
              <p className="starDetails">
                {htmlToText(data[0].details, {
                  limits: 10,
                }).length > 320
                  ? htmlToText(data[0].details, {
                      limits: 10,
                    }).substr(0, 320) + "..."
                  : htmlToText(data[0].details, {
                      limits: 10,
                    })}
              </p>
            </div>
          )}

          <div className="row news-list-left">
            {data &&
              data.map(
                (el, index) =>
                  index !== 0 && (
                    <>
                      <div className="col-md-4">
                        <div className="news-item">
                          <div className="news-item-pic">
                            <Link href={`/news/${el._id}`}>
                              <img src={base.cdnUrl + "/" + el.pictures[0]} />
                            </Link>
                          </div>
                          <div className="title">
                            <Link href={`/news/${el._id}`}>
                              <h4> {el.name} </h4>
                            </Link>
                          </div>
                          <p className="news-item-details">
                            {htmlToText(el.details, {
                              limits: 10,
                            }).length > 180
                              ? htmlToText(el.details, {
                                  limits: 10,
                                }).substr(0, 180) + "..."
                              : htmlToText(el.details, {
                                  limits: 10,
                                })}
                          </p>
                          <div className="news-item-info">
                            <div className="news-item-info-item">
                              <FontAwesomeIcon icon={faClock} />
                              {el.createAt.slice(0, 10)}
                            </div>
                            <div className="news-item-info-item">
                              <FontAwesomeIcon icon={faEye} />
                              {el.views}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
              )}
            <div class="clearfix visible-xl"> </div>
          </div>
        </div>
      </section>
    </>
  );
}
