"use client";
import { getPage } from "lib/page";
import NotFound from "components/Generals/Notfound";
import PageDetails from "components/Page/PageDetails";
import { useEffect, useState } from "react";
import Loader from "components/Generals/Loader";
import base from "lib/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye } from "@fortawesome/free-regular-svg-icons";
import Share from "components/Generals/Share";
import Link from "next/link";

export default async function Page({ params: { slug } }) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPage(slug);
      if (data.page) {
        setPage(data.page);
        setMenu(data.menu);
      }
      setLoading(false);
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  if (loading == true) {
    return (
      <>
        <section className="section">
          <div className="container">
            <Loader />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {" "}
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
          <h2> {menu && menu.name} </h2>
          <div className="bread">
            <li>
              <Link href="/"> Нүүр </Link>
            </li>
            <span> /</span>
            <li> {menu && menu.name} </li>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="container news-container">
              {page ? (
                <>
                  <section>
                    <div className="container news-container">
                      <div className="news-box">
                        <div className="news-box-header">
                          <h2>{page.name}</h2>
                          <div className="news-item-info"></div>
                        </div>
                        <div className="news-item-img">
                          {page.pictures && (
                            <img src={base.cdnUrl + "/" + page.pictures[0]} />
                          )}
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: page.details,
                          }}
                          className="newsDescription"
                        ></div>
                        <Share shareUrl={base.baseUrl + "page/" + page.slug} />
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <NotFound />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
