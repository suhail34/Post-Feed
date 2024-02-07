import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(()=> {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });
  const navigate = useNavigate();
  const register = async (payload) => {
    try {
      const resp = await axios.post("http://localhost:8080/api/auth/signup", payload, {withCredentials: true});
      localStorage.setItem("userProfile", JSON.stringify(resp.data.user));
      setUser(resp.data)
      navigate("/post");
    } catch (err) {
      navigate("/login");
      console.error(err);
    }
  }
  const login = async (payload) => {
    try {
      const resp = await axios.post("http://localhost:8080/api/auth/login", payload, {withCredentials: true});
      localStorage.setItem("userProfile", JSON.stringify(resp.data.user));
      setUser(resp.data)
      navigate("/post");
    } catch (err) {
      navigate("/login");
      console.error(err);
    }
  }
  const logout = async () => {
    try {
      const resp = await axios.get('http://localhost:8080/api/auth/logout', {withCredentials: true});
      console.log(resp);
      localStorage.removeItem("userProfile");
      navigate("/login");
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <AuthContext.Provider value={{user, login, register, logout}}>
        {children}
      </AuthContext.Provider>
    </>
  ) 
}

export default AuthContext;
