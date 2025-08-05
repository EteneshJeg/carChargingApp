import React, { createContext, useContext, useState } from 'react';

// 1. Create the context
const QrContext = createContext();

// 2. Create a provider that holds the scanned data and updates it
export const QrProvider = ({ children }) => {
  const [scannedData, setScannedData] = useState(null);

  return (
    <QrContext.Provider value={{ scannedData, setScannedData }}>
      {children}
    </QrContext.Provider>
  );
};

// 3. Create a hook to access context in any component
export const useQr = () => {
  const context = useContext(QrContext);
  if (!context) {
    throw new Error('useQr must be used inside QrProvider');
  }
  return context;
};
