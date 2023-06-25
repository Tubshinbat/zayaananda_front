import { getCourse } from "lib/course";

export async function generateMetadata({ params }) {
  const { course } = await getCourse(params.id);
  let title = "Zaya's ananda centre";

  if (course) {
    title = course.name + " - " + title;
  }

  return {
    title,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
