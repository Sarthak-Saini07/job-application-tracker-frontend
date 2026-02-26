import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/axiosInstance";

// const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: t, user: u } = res.data;
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify(u));
    setToken(t);
    setUser(u);
    navigate('/');
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };
  // useEffect(() => {
  //   if (token) {
  //     api.get('/users/profile')
  //       .then((res) => {
  //         setUser(res.data);
  //       })
  //       .catch(() => {
  //         logout();
  //       })
  //       .finally(() => setLoading(false));
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);
  useEffect(() => {
  const fetchProfile = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/users/profile");
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [token]);
//   useEffect(() => {
//   const fetchProfile = async () => {
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await api.get("/users/profile");
//       setUser(res.data);
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProfile();
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [token]);

  // const login = async (email, password) => {
  //   const res = await api.post('/auth/login', { email, password });
  //   const { token: t, user: u } = res.data;
  //   localStorage.setItem('token', t);
  //   localStorage.setItem('user', JSON.stringify(u));
  //   setToken(t);
  //   setUser(u);
  //   navigate('/');
  // };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token: t, user: u } = res.data;
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify(u));
    setToken(t);
    setUser(u);
    navigate('/');
  };

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   setToken(null);
  //   setUser(null);
  //   navigate('/login');
  // };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
