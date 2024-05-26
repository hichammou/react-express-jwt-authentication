/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        ...action.payload,
      };
    case "logout":
      return initialState;

    default:
      throw new Error("Unknowen option");
  }
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const accessToken = localStorage.getItem("AccessToken");
      if (!accessToken) {
        return dispatch({ type: "logout" });
      }

      const res = await axios.get("/account", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 201) {
        return dispatch({
          type: "login",
          payload: { user: res.data.user, isAuthenticated: true },
        });
      }

      localStorage.removeItem("AccessToken");
    })();
  }, []);

  async function login(username, password) {
    setIsLoading(true);
    const {
      data: { token, user },
    } = await axios.post("/login", { username, password });

    localStorage.setItem("AccessToken", token);
    axios.defaults.headers.common.Authorization = "Bearer " + token;
    setIsLoading(false);
    dispatch({ type: "login", payload: { user, isAuthenticated: true } });
  }

  async function logout() {
    localStorage.removeItem("AccessToken");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
