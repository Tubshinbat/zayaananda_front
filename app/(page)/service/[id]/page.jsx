

import Loading from "app/loading";
import { getService } from "lib/services";
import { Suspense, use } from "react";
import PageDetails from "components/Page/PageDetails";

export default async function Page({ params: { id } }) {
  const { service } = await getService(id);
  let data = {};
  if (!service) {
    return;
  } 

  return (
    <div>
      <main>
        <Suspense fallback={<Loading />}>
          <PageDetails page={service} />
        </Suspense>
      </main>
    </div>
  );
}
