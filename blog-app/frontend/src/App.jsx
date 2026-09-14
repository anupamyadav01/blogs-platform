import { useState } from "react";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleOnSubmit(e) {
    console.log("helo");

    if (e) e.preventDefault();
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>

        <form className="signup-form">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
              id="name"
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button onClick={handleOnSubmit} type="button" className="submit-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
