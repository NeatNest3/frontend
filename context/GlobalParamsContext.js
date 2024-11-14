import React, { createContext, useContext, useState } from "react";

// Create the Context
const GlobalParamsContext = createContext();

// Create a custom hook to use the context
export const useGlobalParams = () => useContext(GlobalParamsContext);

// Create a Provider component to wrap your app
export const GlobalParamsProvider = ({ children }) => {
  const [globalParams, setGlobalParams] = useState({
    date: null,
    time: null,
    rooms: [],
  });

  const updateGlobalParams = (params) => {
    setGlobalParams((prevParams) => ({
      ...prevParams,
      ...params,
    }));
  };

    const clearGlobalParams = () => {
    setGlobalParams({
      date: null,
      time: null,
      rooms: [],
    });
  };

  return (
    <GlobalParamsContext.Provider value={{ globalParams, updateGlobalParams, clearGlobalParams }}>
      {children}
    </GlobalParamsContext.Provider>
  );
};
