import { Suspense, use } from "react";
import Script from "next/script";
import Loading from "./loading";
import Header from "components/Home/header";
import Slider from "components/Home/slider";
import Service from "components/Home/services";

import { getBanners } from "lib/banners";
import { getServices } from "lib/services";
import { getCourses } from "lib/course";
import Courses from "components/Home/courses";
import Products from "components/Home/product";
import { getProducts } from "lib/product";
import Footer from "components/Footer";
import { getWebInfo } from "lib/webinfo";
import { getMenus } from "lib/menus";
import { getSocials } from "lib/socialLinks";

export default async function Page() {
  const { banners, error } = await getBanners();
  const { services } = await getServices(`status=true&limit=3`);
  const { courses } = await getCourses(`status=true&limit=3`);
  const { products } = await getProducts(`status=true&limit=10`);
  const { webInfo: info } = await getWebInfo();
  const { menus } = await getMenus();
  const { socialLinks } = await getSocials();

  return (
    <div>
      <main className="black">
        <Suspense fallback={<Loading />}>
          <div className="headerArea">
            <Header />
            <Slider banners={banners} />
          </div>
          <Service services={services} />
          <Courses courses={courses} />
          <Products products={products} />
          <Footer info={info} menus={menus} socialLinks={socialLinks} />
        </Suspense>
      </main>
      <Script src="/js/scripts.js" crossorigin="anonymous" />
    </div>
  );
}
