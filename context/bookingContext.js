"use client";

import { getService } from "lib/services";
import React, { useState, createContext, useContext, useEffect } from "react";
const BookingContext = createContext({});

export const BookingProvider = ({ children }) => {
  const [service, setService] = useState(null);
  const [serviceData, setServiceData] = useState({});
  const [booking, setBooking] = useState({});

  useEffect(() => {
    const fetchService = async () => {
      const { service: resultService } = await getService(service);
      setServiceData(resultService);
    };
    fetchService().catch((err) => console.log(err));
  }, [service]);

  return (
    <BookingContext.Provider
      value={{ booking, setBooking, setService, service, serviceData }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);
