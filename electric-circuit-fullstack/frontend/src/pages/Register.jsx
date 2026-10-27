import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

const handleRegister = async (e) => {

    e.preventDefault();

    if (user.password !== user.confirmPassword) {

warningPopup(
    "Password Mismatch",
    "Password and Confirm Password should be the same."
);
        return;

    }

    try {

        await API.post("/user/register", {

            name: user.name,
            email: user.email,
            password: user.password

        });

await successPopup(
    "Account Created 🎉",
    "Registration Successful"
);

        navigate("/login");

    } catch (error) {

        console.log(error);

await errorPopup(
    "Registration Failed",
    "Unable to create account."
);
    }

};
  return (
    <>
      <style>{`

      *{
      margin:0;
      padding:0;
      box-sizing:border-box;
      font-family:Segoe UI,sans-serif;
      }

      .registerPage{

      width:100%;
      height:100vh;

      display:flex;
      justify-content:center;
      align-items:center;

      background:url("https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600");
      background-size:cover;
      background-position:center;

      }

      .registerBox{

      width:450px;

      background:rgba(255,250,240,.96);

      padding:40px;

      border-radius:20px;

      text-align:center;

      box-shadow:0 10px 30px rgba(60,5,10,.4);

      }

      h1{

      margin-bottom:20px;

      color:#222;

      }

      input{

      width:250px;

      height:50px;

      margin:10px;

      border-radius:10px;

      border:1px solid #ccc;

      padding-left:15px;

      font-size:16px;

      }

      button{

      width:250px;

      height:50px;

      margin-top:20px;

      background: linear-gradient(135deg, #ffe066 0%, #d4af37 100%); box-shadow:0 4px 15px rgba(212,175,55,.35);

      border:none;

      border-radius:10px;

      font-size:17px;

      font-weight:bold;

      cursor:pointer;

      }

      button:hover{

      background:#c9a227;

      }

      p{

      margin-top:20px;

      }

      a{

      text-decoration:none;

      font-weight:bold;

      color:#c1121f;

      }

      `}</style>

      <div className="registerPage">

        <form className="registerBox" onSubmit={handleRegister}>

          <h1>Create Account</h1>

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <br/>

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <br/>

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <br/>

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />

          <br/>

          <button type="submit">
            Register
          </button>

          <p>

            Already have an account?

            <Link to="/login">
              {" "}Login
            </Link>

          </p>

        </form>

      </div>

    </>
  );
}

export default Register;