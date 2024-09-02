import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmailAndPassword } from '../../../services/userService';
import '/root/workspace/Elden_Ring_Loadouts/src/styles/SignUp.css'

export const SignUp = () => {
    const [user, setUser] = useState({
      email: "",
      fullName: "",
      password: "", // Add password field
      isStaff: false,
    });
    const navigate = useNavigate();
  
    const registerNewUser = () => {
      createUser(user).then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: createdUser.id,
              isStaff: createdUser.isStaff,
            })
          );
          navigate("/");
        }
      });
    };
  
    const handleRegister = (e) => {
      e.preventDefault();
      getUserByEmailAndPassword(user.email).then((response) => {
        if (response.length > 0) {
          window.alert("Account with that email address already exists");
        } else {
          registerNewUser();
        }
      });
    };
  
    const updateUser = (evt) => {
      const copy = { ...user };
      copy[evt.target.id] = evt.target.value;
      setUser(copy);
    };
  
    return (
      <main style={{ textAlign: "center" }}>
        <form className="form-login" onSubmit={handleRegister}>
          <h1>Sign Up</h1>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateUser}
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter your name"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateUser}
                type="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateUser}
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Register
              </button>
            </div>
          </fieldset>
        </form>
      </main>
    );
};
