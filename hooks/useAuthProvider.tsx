import React, { createContext, useReducer, useContext, useEffect, useCallback, useState } from "react";
import usersService from "@service/users";

import { AUTH_ACTION, LOCAL_STORAGE_TOKEN_KEY } from "@constants/auth";
import { isClientContext } from "@utils";

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
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
      usersService
        .me()
        .then(({ user }) => {
          if (user) {
            setUser(user);
          }
          setRehydrating(true);
        })
        .catch(() => {
          isClientContext && localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
          setRehydrating(true);
        });
    } else {
      setRehydrating(true);
    }
  }, [setUser]);

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
