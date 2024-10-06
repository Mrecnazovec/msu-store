'use client'

import { createContext, useState, useContext } from 'react';

const OfferContext = createContext();

export const GlobalOfferContext = ({ children }) => {
  const [offerData, setOfferData] = useState([]);

  return (
    <OfferContext.Provider value={{ offerData, setOfferData }}>
      {children}
    </OfferContext.Provider>
  );
};

export const useOfferContext = () => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error('useOfferContext must be used within a GlobalOfferContext');
  }
  return context;
};