import HomeHeader from "components/Generals/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <HomeHeader />
      {children}
    </>
  );
}
