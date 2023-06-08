import base from "lib/base";
import { getWebInfo } from "lib/webinfo";

export default async function Loading() {
  const { webInfo } = await getWebInfo();
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="spinner-bg">
        <img src={`${base.cdnUrl}/${webInfo.whiteLogo}`} />
        <div className="lds-dual-ring"></div>
      </div>
    </>
  );
}
