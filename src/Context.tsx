import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface State {
  password: string;
  isBooted: boolean;
  address: string
}

type Action =
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_IS_BOOTED'; payload: boolean };

const initialState: State = {
  password: '',
  isBooted: false,
  address: ''
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_IS_BOOTED':
      return { ...state, isBooted: action.payload };
    default:
      return state;
  }
};

const GlobalStateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};