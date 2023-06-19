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
  const [notification, setNotification] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [booking, setBooking] = useState({});
  const [verfiBooking, SetVerfiBooking] = useState(false);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  const clear = () => {
    setError(null);
    SetVerfiBooking(false);
    setBooking({});
    setBookingData(null);
    setServiceData(null);
    setIsBooking(false);
  };

  const createBooking = (data) => {
    axios
      .post("bookings", data)
      .then((result) => {
        setNotification("Захиалга бүртгэгдлээ");
        setBookingData(result.data.data);
        setIsBooking(true);
      })
      .catch((error) => setError(errorRender(error)));
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
        service,
        serviceData,
        setBookingData,
        bookingData,
        checkBooking,
        verfiBooking,
        createBooking,
        isBooking,
        clear,
        notification,
        SetVerfiBooking,
        error,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);
