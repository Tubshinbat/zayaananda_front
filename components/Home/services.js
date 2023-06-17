"use client";

import Loader from "components/Generals/Loader";
import { htmlToText } from "html-to-text";
import base from "lib/base";
import { getServices } from "lib/services";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

const Services = () => {
  const [services, setService] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      const { services: result } = await getServices(`status=true&limit=3`);
      setService(result);
    };

    fetchServices().catch((error) => console.log(error));
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <Suspense fallback={<Loader />}>
            <div className="sectionHeader">
              <div className="sectionTitle">
                <p className="sectionSub"> Zaya's Ananda</p>
                <h3 className="">
                  Манай <span> үйлчилгээнүүд </span>
                </h3>
              </div>
              <Link href="/services"> Бүх үйлчилгээ </Link>
            </div>
            <div className="row services-list">
              {services &&
                services.map((service) => (
                  <div
                    className="col-xl-4 col-lg-6"
                    key={`service_${service._id}`}
                  >
                    <div className="service-item">
                      <Link href={`/services/${service._id}`}>
                        <div className="service-img">
                          {service.pictures && service.pictures[0] && (
                            <img
                              src={`${base.cdnUrl}/450/${service.pictures[0]}`}
                            />
                          )}
                        </div>
                      </Link>
                      <a href={`/services/${service._id}`}>
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
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Services;
