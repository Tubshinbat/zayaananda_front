import base from "lib/base";
import { getMenu } from "lib/menus";

export async function generateMetadata({ params }) {
  const { menu } = await getMenu(`direct=courses`);
  let title = "Онлайн сургалт - Zaya's ananda centre";

  let openGraph = {
    images:
      menu && menu.cover && menu.cover !== ""
        ? `${base.cdnUrl}/${menu.cover}`
        : `${base.baseUrl}/images/header.jpg`,
  };

  return {
    title,
    openGraph,
  };
}

export default function RootLayout({ children }) {
  return <> {children} </>;
}
