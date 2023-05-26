


import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const userJson = localStorage.getItem("user");
const user = userJson && userJson !== "undefined" ? JSON.parse(userJson) : null;

const INITIAL_STATE = {
  user: user,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
