import { GlobalParamsProvider } from "../context/GlobalParamsContext";
import RootLayout from "./app";
import React from "react";
import { Auth0Provider } from "react-native-auth0";

export default function layout() {
  return (
    <Auth0Provider domain={"dev-jbo3q8bi8aocdmxp.us.auth0.com"} clientId={"vGdlxyeVZ90vR7o0F0MNHOMPOrTwuuXf"}>
      <GlobalParamsProvider>
        <RootLayout />
      </GlobalParamsProvider>
    </Auth0Provider>
  );
}
