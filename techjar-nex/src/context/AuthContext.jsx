// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const user = localStorage.getItem("authUser");

//     if (token && user) {
//       setAuth({ token, user: JSON.parse(user) });
//     }
//   }, []);

//   const login = ({ token, user }) => {
//     localStorage.setItem("authToken", token);
//     localStorage.setItem("authUser", JSON.stringify(user));
//     setAuth({ token, user });
//   };

//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("authUser");
//     setAuth(null);
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");

    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
    }
    setLoading(false); // ✅ Finish loading after checking localStorage
  }, []);

  const login = ({ token, user }) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        token: auth?.token ?? null,
        user: auth?.user ?? null,
        login,
        logout,
        loading, // ✅ expose loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
