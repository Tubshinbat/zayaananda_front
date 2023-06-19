import Loader from "components/Generals/Loader";
import Courses from "components/Home/Courses";
import HomeHeader from "components/Home/header";
import Products from "components/Home/Product";
import Services from "components/Home/Services";
import Slider from "components/Home/Slider";
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
