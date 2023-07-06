import base from "lib/base";

import { getProduct } from "lib/product";

export async function generateMetadata({ params }) {
  const { product } = await getProduct(params.id);

  let title = "Zaya's ananda centre";

  if (product) {
    title = product.name + " - " + title;
  }

  let openGraph = {
    images:
      product && product.pictures && product.pictures[0]
        ? `${base.cdnUrl}/${product.pictures[0]}`
        : `${base.baseUrl}/images/header.jpg`,
  };

  return {
    title,
    openGraph,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
