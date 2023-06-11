"use client";

import { htmlToText } from "html-to-text";
import base from "lib/base";

const HomeHeader = ({ services }) => {
  return (
    <>
      <section>
        <div className="container">
          <div className="sectionHeader">
            <div className="sectionTitle">
              <p className="sectionSub"> Zaya's Ananda</p>
              <h3 className="">
                Манай <span> үйлчилгээнүүд </span>
              </h3>
            </div>
            <a href="/services"> Бүх үйлчилгээ </a>
          </div>
          <div className="row services-list">
            {services &&
              services.map((service) => (
                <div className="col-xl-4 col-lg-6">
                  <div className="service-item">
                    <a href={`/service/${service._id}`}>
                      <div className="service-img">
                        {service.pictures && service.pictures[0] && (
                          <img src={`${base.cdnUrl}/${service.pictures[0]}`} />
                        )}
                      </div>
                    </a>
                    <a href={`/service/${service._id}`}>
                      <h4>{service.name}</h4>
                    </a>
                    <p>
                      {htmlToText(service.details, {
                        limits: 10,
                      }).length > 170
                        ? htmlToText(service.details, {
                            limits: 10,
                          }).substr(0, 170) + "..."
                        : htmlToText(service.details, {
                            limits: 10,
                          })}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHeader;
