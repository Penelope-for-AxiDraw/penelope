import React, { createContext, useReducer } from 'react';

const initialState = {
  entries: [],
  user: {},
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    let updatedState;

    switch (action.type) {
      case 'SET_ENTRIES_DATA':
        updatedState = {
          ...prevState,
          entries: action.payload,
        };
        return updatedState;

      case 'SET_USER':
        updatedState = {
          ...prevState,
          user: action.payload,
        };
        return updatedState;

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
