import HomeHeader from "components/Generals/Header";
import { useCookies } from "react-cookie";

export default function RootLayout({ children }) {
  return (
    <>
      <HomeHeader />
      {children}
    </>
  );
}
