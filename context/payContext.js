"use client";
import axios from "axios-base";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const PayContext = createContext({});

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

export const PayProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [qpay, setQpay] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const clear = () => {
    setLoading(false);
    setError(null);
    setIsPaid(false);
    setNotification(null);
  };

  const init = () => {
    setVisible(false);
    setLoading(false);
    setIsPaid(false);
    setQpay(null);
    setInvoice(null);
    setError(null);
    setNotification(null);
  };

  const createQpayAndInvoice = async (data) => {
    setLoading(true);
    await axios.get("payment");

    axios
      .post("payment/create", data)
      .then((result) => {
        setQpay(result.data.data);
        setInvoice(result.data.invoice);
      })
      .catch((error) => setNotification(errorRender(error)));

    clear();
  };

  const checkPayment = async (invoice_id) => {
    axios
      .get(`payment/call?invoice=${invoice_id}`)
      .then((result) => {
        setIsPaid(true);
        setNotification("Төлбөр төлөгдсөн байна");
      })
      .catch((error) => {
        setError(errorRender(error));
        setIsPaid(false);
      });
    clear();
  };

  return (
    <PayContext.Provider
      value={{
        setVisible,
        loading,
        visible,
        isPaid,
        qpay,
        invoice,
        error,
        notification,
        checkPayment,
        createQpayAndInvoice,
        init,
      }}
    >
      {" "}
      {children}{" "}
    </PayContext.Provider>
  );
};

export const usePayContext = () => useContext(PayContext);
