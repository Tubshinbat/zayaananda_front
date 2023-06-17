import { getService } from "lib/services";

export async function generateMetadata({ params }) {
  const { service } = await getService(params.id);
  let title = "Zaya's ananda centre";

  if (service) {
    title = service.name + " - " + title;
  }

  return {
    title,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
