import { getContent } from "lib/news";

export async function generateMetadata({ params }) {
  const { news } = await getContent(params.id);
  let title = "Zaya's ananda centre";

  if (news) {
    title = news.name + " - " + title;
  }

  return {
    title,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
