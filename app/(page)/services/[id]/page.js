import RandomProduct from "components/Generals/RandomProduct";
import ServiceDetails from "components/Service/service-details";
import { getService } from "lib/services";

export default async function Page({ params: { id } }) {
  const { service } = await getService(id);

  if (!service) {
    return;
  }

  return (
    <div>
      <main>
        <ServiceDetails page={service} />
        <RandomProduct />
      </main>
    </div>
  );
}
