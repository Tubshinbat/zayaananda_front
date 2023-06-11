"use client";
import { useRouter } from "next/navigation";

import React, { useState, createContext, useContext } from "react";

const BookingContext = createContext({});

export const BookingProvider = ({ children }) => {
  const router = useRouter();
  const [service, setService] = useState("");
  const [booking, setBooking] = useState({});

  const pushBooking = (value) => {
    setService(value);
    router.push("/booking");
  };

  return (
    <BookingContext.Provider
      value={{ booking, setBooking, setService, service, pushBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);
