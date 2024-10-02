'use client'

import { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const GlobalCurrencyContext = ({ children }) => {
  const [currency, setCurrency] = useState('Uzb');

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrencyContext must be used within a GlobalCurrencyContext');
  }
  return context;
};