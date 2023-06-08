import Loading from "app/loading";
import Side from "components/Side";
import Team from "components/Team/team";

import { getEmployees } from "lib/employee";
import { getWebInfo } from "lib/webinfo";
import { Suspense, use } from "react";

export default async function Page() {
  const { employees } = await getEmployees();
  const { webInfo } = await getWebInfo();
  return (
    <div>
      <main>
        <Suspense fallback={<Loading />}>
          <div className="pageDetailsHeader">
            <div className="container">
              <h2> Бидний тухай </h2>
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
                        __html: webInfo.siteInfo,
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
    </div>
  );
}
