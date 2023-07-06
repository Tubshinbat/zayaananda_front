"use client";
import axios from "axios-base";
import React, { useState, createContext, useContext } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNotificationContext } from "./notificationContext";
import { usePayContext } from "./payContext";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const { setError, setAlert, setContentLoad } = useNotificationContext();
  const { createQpayAndInvoice } = usePayContext();
  const [cart, setCarts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const [total, setTotal] = useState(0);
  const [isVerfi, setVerfi] = useState(false);
  const [info, setInfo] = useState({
    email: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
  });

  const cartInit = () => {
    setTotal(0);
    setContentLoad(false);
  };

  const cartAdd = (data) => {
    cartInit();
    setCarts((bc) => [...bc, data]);
    setAlert(data.name + " сагсанд нэмэгдлээ");
  };

  useEffect(() => {
    if (cookies.cart) {
      setCarts(cookies.cart);
    }
  }, []);

  useEffect(() => {
    if (!cart || cart.length > 0) {
      setCookie("cart", JSON.stringify(cart), { path: "/" });
      let sum = 0;
      cart.map((el) => {
        sum = sum + el.price;
      });
      setTotal(sum);
    }
  }, [cart]);

  const qtyChange = (data) => {
    if (data.length <= 0) {
      setCarts(() => []);
      removeCookie("cart");
    } else {
      setCarts(() => [...data]);
    }
  };

  const createOrder = async (data) => {
    setContentLoad(true);
    axios
      .post("orders", data)
      .then((result) => {
        const resultOrder = result.data.data;
        const invoiceData = {
          sender_invoice_no: `P${resultOrder.orderNumber}`,
          sender_branch_code: "product",
          invoice_receiver_code: resultOrder.phoneNumber,
          invoice_description: `${resultOrder.phoneNumber} - дугаартай хэрэглэгч B${resultOrder.orderNumber} - бараа захиалав.`,
          amount: resultOrder.totalPrice,
        };
        createQpayAndInvoice(invoiceData);
        setContentLoad(false);
      })
      .catch((error) => {
        setError(error);
        setContentLoad(false);
      });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCarts,
        setInfo,
        info,
        total,
        cartAdd,
        qtyChange,
        createOrder,
        isVerfi,
        setVerfi,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
