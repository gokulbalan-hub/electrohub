import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function Login() {

    const navigate = useNavigate();
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/user/login", {
                email,
                password
            });

            if (response.data.status === "SUCCESS") {

                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("userName", response.data.userName);
                localStorage.setItem("role", response.data.role);

 await successPopup(
    "Welcome 🎉",
    "Login Successful"
);

               if (response.data.role === "SUPER_ADMIN") {

    navigate("/super-admin");

} else if (response.data.role === "ADMIN") {

    navigate("/admin");

} else {

    navigate("/");

}

            } else {

               await errorPopup(
    "Login Failed",
    "Invalid Email or Password"
);

            }

        } catch (error) {

            console.log(error);

await errorPopup(
    "Server Error",
    "Please try again later."
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
font-family:'Segoe UI',sans-serif;
}

body{
background:#f5f5f5;
overflow:hidden;
}

.loginPage{

width:100%;
min-height:100vh;

display:flex;
justify-content:center;
align-items:center;

padding:20px;

background-image:url("/images/hero/login.jpg");
background-size:cover;
background-position:center;
background-repeat:no-repeat;

}

.loginBox{

width:520px;

min-height:550px;

background:rgba(255,250,243,.96);

backdrop-filter:blur(10px);

padding:50px;

border-radius:25px;

box-shadow:0 15px 40px rgba(0,0,0,.30);

text-align:center;

}

.loginBox h1{

font-size:48px;
margin-bottom:35px;

}

.loginBox input[type="email"],
.loginBox input[type="password"],
.loginBox input[type="text"]{

width:100%;
height:58px;
padding:0 18px;
font-size:17px;
margin-bottom:20px;
border:1px solid #ccc;
border-radius:12px;

}

.loginBox input:focus{

border-color:#C1121F;

box-shadow:0 0 10px rgba(193,18,31,.25);

}

.showPass{

display:flex;

justify-content:center;

align-items:center;

gap:10px;

margin:15px 0 20px;

font-size:15px;

color:#333;

}

.showPass input{

width:18px;

height:18px;

cursor:pointer;

}

.loginBtn{

width:100%;
height:58px;
font-size:18px;
border-radius:12px;

}

.loginBtn:hover{

background:#8B0000;

transform:translateY(-2px);

}

.register{

margin-top:22px;

display:flex;

justify-content:center;

align-items:center;

gap:8px;

font-size:15px;

color:#444;

}

.register a{

text-decoration:none;

font-weight:bold;

color:#C1121F;

transition:.3s;

}

.register a:hover{

color:#8B0000;

text-decoration:underline;

}

@media(max-width:768px){

.loginBox{

width:100%;

max-width:380px;

padding:30px;

}

.loginBox h1{

font-size:34px;

}

}

`}</style>

<div className="loginPage">

<div className="loginBox">

<h1>Welcome Back</h1>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<div className="showPass">

<input
type="checkbox"
checked={showPassword}
onChange={()=>setShowPassword(!showPassword)}
/>

<span>Show Password</span>

</div>

<button
type="submit"
className="loginBtn"
>

Login

</button>

<div className="register">

New User?

<Link to="/register">

Register Here

</Link>

</div>

</form>

</div>

</div>

</>

);

}

export default Login;