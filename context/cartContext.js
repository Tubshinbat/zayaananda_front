"use client";
import axios from "axios-base";
import React, { useState, createContext, useContext } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const CartContext = createContext({});

const errorRender = (error) => {
  let resError = "Алдаа гарлаа дахин оролдоно уу";

  if (error.message) {
    resError = error.message;
  }

  if (error.response !== undefined && error.response.status !== undefined) {
    resError = error.response.status;
  }
  if (
    error.response !== undefined &&
    error.response.data !== undefined &&
    error.response.data.error !== undefined
  ) {
    resError = error.response.data.error.message;
  }
  return resError;
};

export const CartProvider = ({ children }) => {
  const [cart, setCarts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const [total, setTotal] = useState(0);
  const [info, setInfo] = useState({
    orderMsg: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
  });
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const clear = () => {
    setNotification(null);
    setError(null);
    setLoading(false);
  };

  const cartAdd = (data) => {
    setCarts((bc) => [...bc, data]);
  };

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

  useEffect(() => {
    if (!cart || cart.length <= 0) {
      if (cookies.cart) setCarts(cookies.cart);
    }
  }, [cart, cookies.cart]);

  const qtyChange = (data) => {
    if (data.length <= 0) {
      setCarts(() => []);
      removeCookie("cart");
    } else {
      setCarts(() => [...data]);
    }
  };

  const createOrder = async (data) => {
    setLoading(true);
    await axios.get("payment");
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
        setInvoiceData(invoiceData);
      })
      .catch((error) => setError(errorRender(error)));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCarts,
        setInfo,
        total,
        cartAdd,
        info,
        qtyChange,
        createOrder,
        loading,
        error,
        notification,
        invoiceData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
