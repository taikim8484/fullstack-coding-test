import React, { createContext, useReducer, useContext, useEffect, useCallback, useState } from "react";

import { AUTH_ACTION } from "@constants/auth";
import { isClientContext } from "@utils";

const AUTH = "AUTH";

const persistState = (storageKey: string, state: object): void => {
  isClientContext() && window.localStorage.setItem(storageKey, JSON.stringify(state));
};

const getIntialState = (storageKey: string): any => {
  if (isClientContext()) {
    const savedState = window.localStorage.getItem(storageKey);
    try {
      if (!savedState) {
        return initialValues;
      }
      return JSON.parse(savedState);
    } catch (e) {
      return initialValues;
    }
  }
};

const initialValues = {
  currentUser: null,
};

const AuthStateContext = createContext(null);
const AuthDispatchContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTION.SET_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case AUTH_ACTION.RESET: {
      return initialValues;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialValues);
  const [rehydrating, setRehydrating] = useState(false);

  const setUser = useCallback(
    (user) => {
      dispatch({
        type: AUTH_ACTION.SET_USER,
        payload: user,
      });
    },
    [dispatch]
  );

  const resetUser = useCallback(() => {
    dispatch({
      type: AUTH_ACTION.RESET,
    });
  }, [dispatch]);

  useEffect(() => {
    const { currentUser } = getIntialState(AUTH);
    if (currentUser) {
      setUser(currentUser);
    }
    setRehydrating(true);
  }, [setUser]);

  useEffect(() => persistState(AUTH, state), [state]);

  return (
    <AuthStateContext.Provider
      value={{
        ...state,
        rehydrating,
      }}>
      <AuthDispatchContext.Provider
        value={{
          setUser,
          resetUser,
        }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}
function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuthState, useAuthDispatch };
