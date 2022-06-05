import React, { createContext, useReducer } from 'react';
import { getFromLocalStorage } from '../utils';

const creds = getFromLocalStorage('axidrawCreds');
const hasCreds = creds?.host && creds?.port;
const entryIndex = getFromLocalStorage('entryIndex');

const initialState = {
  entries: [],
  currentEntryIndex: entryIndex || 0,
  user: {},
  disco: {
    showWarning: false,
    warningCopy: {},
    leave: () => {},
  },
  isConnected: false,
  axiAddress: {
    host: hasCreds ? creds.host : '',
    port: hasCreds ? creds.port : '',
  },
  axiConnectionError: '',
  axiConnection: {},
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

      case 'SET_CONNECTED':
        updatedState = {
          ...prevState,
          isConnected: action.payload.data,
        };
        return updatedState;

      case 'SET_AXI_ADDRESS':
        updatedState = {
          ...prevState,
          axiAddress: action.payload.data,
        };
        return updatedState;

      case 'SET_CONNECTION_ERROR':
        updatedState = {
          ...prevState,
          axiConnectionError: action.payload.data,
        };
        return updatedState;

      case 'SET_AXI_CONNECTION':
        updatedState = {
          ...prevState,
          axiConnection: action.payload.data,
        };
        return updatedState;

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
