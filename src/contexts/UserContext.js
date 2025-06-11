'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { verifyToken } from '@/services/auth';
import Cookies from 'js-cookie';

const UserContext = createContext({
  user: null,
  loading: true,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return setLoading(false);

    verifyToken(token)
      .then((userData) => setUser(userData))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);