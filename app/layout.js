import "bootstrap/dist/css/bootstrap.css";
import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import { WebInfoProvider } from "context/webinfoContext";
import { MenuProvider } from "context/menuContext";
import { CartProvider } from "context/cartContext";
import { BookingProvider } from "context/bookingContext";
import Footer from "components/Generals/Footer";
import { AuthProvider } from "context/authContext";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: `Zaya's ananda centre`,
  description:
    "Zaya’s Ananda далд ухамсар, энерги мэдээлэл судалгааны төв, нийтийн далд ухамсарыг сэрээх төв",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <MenuProvider>
              <WebInfoProvider>
                <BookingProvider>
                  {children}
                  <Footer />
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </BookingProvider>
              </WebInfoProvider>
            </MenuProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
