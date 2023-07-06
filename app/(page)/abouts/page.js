"use client";
import Team from "components/Team/team";
import base from "lib/base";

import { getEmployees } from "lib/employee";
import { getMenu, getMenus } from "lib/menus";
import { getWebInfo } from "lib/webinfo";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [menu, setMenu] = useState(null);
  const [webInfo, setWebInfo] = useState();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchGetMenu = async () => {
      const { menu } = await getMenu(`direct=abouts`);
      const { webInfo } = await getWebInfo();
      const { employees } = await getEmployees();
      setWebInfo(webInfo);
      setMenu(menu);
      setEmployees(employees);
    };

    fetchGetMenu().catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <Suspense fallback={`loading...`}>
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
            <h2> Бидний тухай </h2>
            <div className="bread">
              <li>
                <Link href="/"> Нүүр </Link>
              </li>
              <span> /</span>
              <li> {menu && menu.name} </li>
            </div>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="pageDetails">
                  <div
                    className="pageDescription"
                    dangerouslySetInnerHTML={{
                      __html: webInfo && webInfo.policy,
                    }}
                  ></div>
                  <h4 className="pageDetailsSubTitle"> Манай хамт олон </h4>
                  <div className="row">
                    {employees &&
                      employees.map((employee, index) => (
                        <Team memberData={employee} key={`t-${index}`} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
}
