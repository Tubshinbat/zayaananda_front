import Loading from "app/loading";
import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getServices } from "lib/services";

import { Suspense, use } from "react";

export default async function Page() {
  const { services } = await getServices(`status=true`);
  return (
    <div>
      <main>
        <Suspense fallback={<Loading />}>
          <div className="pageDetailsHeader">
            <div className="container">
              <h2> Манай үйлчилгээнүүд </h2>
            </div>
          </div>
          <section>
            <div className="container">
              <div className="row">
                {services &&
                  services.map((service, index) => {
                    if (index == 0) {
                      return (
                        <div className="col-lg-12">
                          <div className="service-row">
                            <div className="service-row-img">
                              
                              <img
                                src={`${base.cdnUrl}/${service.pictures[0]}`}
                              />
                          
                            </div>
                            <div className="service-row-content">
                                 <a href={`/service/${service._id }`} >
                                <h4> {service.name} </h4>
                                </a>
                                <p>
                              {htmlToText(service.details, {
                                limits: 10,
                              }).length > 240
                                ? htmlToText(service.details, {
                                    limits: 10,
                                  }).substr(0, 240) + "..."
                                : htmlToText(service.details, {
                                    limits: 10,
                                  })}</p>
                                  <a href={`/service/${service._id }`}  className="more-btn"> Дэлгэрэнгүй </a>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return <div className="col-lg-4"> 
                      <div className="serivce-col">
                        <div className="service-col-img">
                              
                              <img
                                src={`${base.cdnUrl}/${service.pictures[0]}`}
                              />
                          
                            </div>
                             <div className="service-col-content">
                                 <a href={`/service/${service._id }`} >
                                <h4> {service.name} </h4>
                                </a>
                                <p>
                              {htmlToText(service.details, {
                                limits: 10,
                              }).length > 240
                                ? htmlToText(service.details, {
                                    limits: 10,
                                  }).substr(0, 240) + "..."
                                : htmlToText(service.details, {
                                    limits: 10,
                                  })}</p>
                                  <a href={`/service/${service._id }`}  className="more-btn"> Дэлгэрэнгүй </a>
                            </div>
                        </div>
                      </div>;
                    }
                  })}
              </div>
            </div>
          </section>
        </Suspense>
      </main>
    </div>
  );
}
