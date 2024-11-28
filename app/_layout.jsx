import { GlobalParamsProvider } from '../context/GlobalParamsContext';
import RootLayout from './app';
import React from 'react';

export default function layout() {
  return (
    <GlobalParamsProvider>
        <RootLayout/>
    </GlobalParamsProvider>
  )
}