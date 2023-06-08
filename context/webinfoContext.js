"use client";
import { getWebInfo } from "lib/webinfo";
import React, { useState, createContext, useContext } from "react";

const WebInfoContext = createContext({});

export const WebInfoProvider = ({ children }) => {
  const [info, setInfo] = useState({
    logo: "",
    whiteLogo: "",
    name: "Zaya's ananda",
    address: "",
    siteInfo: "",
    policy: "",
    phone: "",
    email: "",
  });

  const [title, setTitle] = useState("");

  const getInfo = async () => {
    const { webInfo } = await getWebInfo();
    if (webInfo) {
      setInfo(webInfo);
    }
  };

  return (
    <WebInfoContext.Provider value={{ info, getInfo, title, setTitle }}>
      {children}
    </WebInfoContext.Provider>
  );
};

export const useWebInfoContext = () => useContext(WebInfoContext);
