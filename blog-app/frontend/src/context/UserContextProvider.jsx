import { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("User"));

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/v1/me/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
      const userData = await response.json();
      console.log(userData);
      setUser(userData?.user);
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
