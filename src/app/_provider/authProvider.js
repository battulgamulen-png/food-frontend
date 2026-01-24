import * as React from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const getMe = async () => {
    // Fetch user data from backend
    // Example:
    // const response = await axios.get(`${BACK_END_URL}/me`, { headers: { Authorization: `Bearer ${token}` } });
    // setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
