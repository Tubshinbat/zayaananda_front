import base from "lib/base";
import { getCourse } from "lib/course";

export async function generateMetadata({ params }) {
  const { course } = await getCourse(params.id);

  let title = "Zaya's ananda centre";

  if (course) {
    title = course.name + " - " + title;
  }

  let openGraph = {
    images:
      course && course.pictures && course.pictures[0]
        ? `${base.cdnUrl}/${course.pictures[0]}`
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
