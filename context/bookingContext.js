"use client";
import axios from "axios-base";
import { getService } from "lib/services";
import React, { useState, createContext, useContext, useEffect } from "react";
import { useNotificationContext } from "./notificationContext";
import { usePayContext } from "./payContext";
const BookingContext = createContext({});

export const BookingProvider = ({ children }) => {
  const { setContentLoad, setError, setAlert } = useNotificationContext();
  const { createQpayAndInvoice } = usePayContext();
  const [serviceData, setService] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [booking, setBooking] = useState(null);
  const [verfiBooking, setVerfiBooking] = useState(false);

  const initBooking = () => {
    setService(null);
    setServiceId(null);
    setBooking(null);
    setVerfiBooking(false);
  };

  useEffect(() => {
    const fetchService = async () => {
      const { service } = await getService(serviceId);
      setService(service);
    };
    fetchService().catch((err) => console.log(err));
  }, [serviceId]);

  useEffect(() => {
    if (booking) {
      const invoiceData = {
        sender_invoice_no: `B${booking.bookingNumber}`,
        sender_branch_code: "booking",
        invoice_receiver_code: booking.phoneNumber,
        invoice_description: `${booking.phoneNumber} - дугаартай хэрэглэгч B${booking.bookingNumber} - цаг захиалга хийлээ.`,
        amount: booking.paidAdvance,
      };

      createQpayAndInvoice(invoiceData);
    }
  }, [booking]);

  const createBooking = async (data) => {
    axios
      .post("bookings", data)
      .then((result) => {
        setBooking(result.data.data);
      })
      .catch((error) => setError(error));
  };

  const checkBooking = (data) => {
    axios
      .post("bookings/checkbooking", data)
      .then((result) => {
        setAlert("Цаг авах боломжтой байна");

        setVerfiBooking(true);
        setBooking(data);
      })
      .catch((error) => {
        setError(error);
        setVerfiBooking(false);
      });
  };

  return (
    <BookingContext.Provider
      value={{
        initBooking,
        createBooking,
        setServiceId,
        serviceData,
        booking,
        verfiBooking,
        checkBooking,
        setVerfiBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);
