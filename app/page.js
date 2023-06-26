import Loader from "components/Generals/Loader";
import Courses from "components/Home/courses";
import HomeHeader from "components/Home/header";
import Products from "components/Home/product";
import Services from "components/Home/services";
import Slider from "components/Home/slider";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <div className="headerArea">
        <Suspense fallback={<Loader />}>
          <HomeHeader />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Slider />
        </Suspense>
      </div>

      <Services />

      <Suspense fallback={<Loader />}>
        <Courses />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Products />
      </Suspense>
    </>
  );
}
