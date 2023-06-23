"use client";
import axios from "axios-base";
import { getService } from "lib/services";
import React, { useState, createContext, useContext, useEffect } from "react";
const BookingContext = createContext({});

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

export const BookingProvider = ({ children }) => {
  const [service, setService] = useState(null);
  const [serviceData, setServiceData] = useState(null);

  const [isBooking, setIsBooking] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [qpay, setQpay] = useState(null);

  const [verfiBooking, SetVerfiBooking] = useState(false);
  const [booking, setBooking] = useState({});

  // UI MESSAGES
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const clear = () => {
    setError(null);
    setNotification(null);
  };

  const init = () => {
    setService(null);
    setServiceData(null);
    setIsBooking(false);
    SetVerfiBooking(false);
    setBooking({});
    setInvoice(null);
    setQpay(null);
  };

  const createBooking = (data) => {
    axios
      .post("bookings", data)
      .then((result) => {
        setNotification("Захиалга бүртгэгдлээ");
        setBooking(result.data.data);
        const resultBooking = result.data.data;
        const invoiceData = {
          sender_invoice_no: `B${resultBooking.bookingNumber}`,
          sender_branch_code: "booking",
          invoice_receiver_code: resultBooking.phoneNumber,
          invoice_description: `${resultBooking.phoneNumber} - дугаартай хэрэглэгч B${resultBooking.bookingNumber} - цаг захиалга хийлээ.`,
          amount: resultBooking.paidAdvance,
        };

        axios
          .post("payment/create", invoiceData)
          .then((result) => {
            setQpay(result.data.data);
            console.log(result.data.data);
            setInvoice(result.data.invoice);
          })
          .catch((error) => console.log(error));

        setIsBooking(true);
      })
      .catch((error) => setError(errorRender(error)));
    clear();
  };

  const checkBooking = (data) => {
    axios
      .post("bookings/checkbooking", data)
      .then((result) => {
        SetVerfiBooking(true);
        setBooking(data);
      })
      .catch((error) => {
        setError(errorRender(error));
        SetVerfiBooking(false);
      });
    clear();
  };

  useEffect(() => {
    const fetchService = async () => {
      const { service: resultService } = await getService(service);
      setServiceData(resultService);
    };
    fetchService().catch((err) => console.log(err));
  }, [service]);

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,
        setService,
        invoice,
        service,
        serviceData,
        checkBooking,
        verfiBooking,
        createBooking,
        isBooking,
        qpay,
        clear,
        notification,
        SetVerfiBooking,
        init,
        error,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);
