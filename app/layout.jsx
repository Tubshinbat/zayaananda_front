import "bootstrap/dist/css/bootstrap.css";
import Script from "next/script";
import "styles/global.css";

import { WebInfoProvider } from "context/webinfoContext";
import { MenuProvider } from "context/menuContext";
import Footer from "components/Footer";
import { getWebInfo } from "lib/webinfo";
import { getMenus } from "lib/menus";
import { getSocials } from "lib/socialLinks";
import { CartProvider } from "context/cartContext";
import { BookingProvider } from "context/bookingContext";

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <link
        href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css`}
      />
      <head />
      <body>
        <CartProvider>
          <MenuProvider>
            <WebInfoProvider>
              <BookingProvider>
              {children}
             </BookingProvider>
            </WebInfoProvider>
          </MenuProvider>
        </CartProvider>
      </body>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <Script
        src="https://kit.fontawesome.com/8c5f1b6ac5.js"
        crossorigin="anonymous"
      />
      <Script src="/js/scripts.js" />
    </html>
  );
}
