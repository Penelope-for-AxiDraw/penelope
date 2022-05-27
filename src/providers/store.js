import React, { createContext, useReducer } from 'react';

const initialState = {
  entries: [],
  currentEntryIndex: 0,
  user: {},
  disco: {
    showWarning: false,
    warningCopy: {},
    leave: () => {},
  },
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
          entries: action.payload.data,
        };
        return updatedState;

      case 'SET_USER':
        updatedState = {
          ...prevState,
          user: action.payload.data,
        };
        return updatedState;

      case 'SET_DEPART':
        updatedState = {
          ...prevState,
          disco: action.payload.data,
        };
        return updatedState;

      case 'SET_ENTRY':
        updatedState = {
          ...prevState,
          currentEntryIndex: action.payload.data,
        };
        return updatedState;

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
