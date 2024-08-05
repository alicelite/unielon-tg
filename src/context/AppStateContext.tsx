// AppStateContext.js
import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <AppStateContext.Provider value={{ isBooted, setIsBooted }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);