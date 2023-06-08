"use client";

import React, { useState, createContext, useContext } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCarts] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCarts }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
