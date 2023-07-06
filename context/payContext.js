"use client";
import axios from "axios-base";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNotificationContext } from "./notificationContext";

const PayContext = createContext({});

export const PayProvider = ({ children }) => {
  const { setContentLoad, setError, setAlert } = useNotificationContext();
  const [visible, setVisible] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [qpay, setQpay] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const paymentInit = () => {
    setVisible(false);
    setIsPaid(false);
    setQpay(null);
    setInvoice(null);
  };

  const createQpayAndInvoice = async (data) => {
    setContentLoad(true);

    axios
      .post("payment/create", data)
      .then((result) => {
        setQpay(result.data.data);
        setInvoice(result.data.invoice);
        setContentLoad(false);
      })
      .catch((error) => {
        setError(error);
        setContentLoad(false);
      });
  };

  const checkPayment = async (invoice_id) => {
    axios
      .get(`payment/call?invoice=${invoice_id}`)
      .then((result) => {
        setIsPaid(true);
        setAlert("Төлбөр төлөгдсөн байна");
        setContentLoad(false);
      })
      .catch((error) => {
        setError(error);
        setIsPaid(false);
        setContentLoad(false);
      });
  };

  return (
    <PayContext.Provider
      value={{
        paymentInit,
        setVisible,
        visible,
        isPaid,
        qpay,
        checkPayment,
        setIsPaid,
        invoice,
        createQpayAndInvoice,
      }}
    >
      {children}
    </PayContext.Provider>
  );
};

export const usePayContext = () => useContext(PayContext);
