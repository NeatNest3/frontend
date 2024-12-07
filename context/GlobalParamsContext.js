import React, { createContext, useContext, useState } from "react";

const GlobalParamsContext = createContext();

export const useGlobalParams = () => useContext(GlobalParamsContext);


export const GlobalParamsProvider = ({ children }) => {
  
  const [globalParams, setGlobalParams] = useState({
    date: null,
    time: null,
    rooms: [],
    user: null,
  });

  const updateGlobalParams = (params) => {
    setGlobalParams((prevParams) => ({
      ...prevParams,
      ...params,
    }));
  };


  const setUser = (userData) => {
    setGlobalParams((prevParams) => ({
      ...prevParams,
      user: userData,
    }))
  };

  const clearCleanParams = () => {
    setGlobalParams((prevParams) => ({
      ...prevParams,
      date: null,
      time: null,
      rooms: [],
    }))
  }

  const clearUserParams = () => {
    setUser(null);
  }

  const clearAllParams = () => {
    setGlobalParams({
      date: null,
      time: null,
      rooms: [],
      user: null,
    });
  };


  return (
    <GlobalParamsContext.Provider value={{ globalParams, updateGlobalParams, setUser, clearCleanParams, clearUserParams, clearAllParams }}>
      {children}
    </GlobalParamsContext.Provider>
  );
};
