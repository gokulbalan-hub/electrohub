import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    confirmPopup,
    successPopup
} from "../utils/Popup";

function Navbar() {

    const navigate = useNavigate();

    const location = useLocation();

    const [userName, setUserName] = useState("");
    const role = localStorage.getItem("role");

    useEffect(() => {

        setUserName(localStorage.getItem("userName"));

    }, []);

const logout = async () => {

    const ok = await confirmPopup(
        "Logout?",
        "Are you sure you want to logout?"
    );

    if (!ok) {
        return;
    }

    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");

    setUserName("");

    await successPopup(
        "Logged Out",
        "See you again!"
    );

    navigate("/login");

};
return (

<>
<style>{`

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

.navbar{

position:fixed;

top:0;

left:0;

width:250px;

height:100vh;

background:#111827;

display:flex;

flex-direction:column;

padding:25px;

box-shadow:5px 0 20px rgba(0,0,0,.25);

z-index:1000;

}

.logo{

font-size:32px;

font-weight:bold;

color:#FFD700;

text-align:center;

margin-bottom:35px;

}

.userBox{

background:#C1121F;

border-radius:15px;

padding:18px;

text-align:center;

margin-bottom:30px;

}

.userBox h3{

color:white;

font-size:16px;

margin-bottom:8px;

}

.userBox h2{

color:#FFD700;

font-size:20px;

}

.menu{

display:flex;

flex-direction:column;

gap:12px;

flex:1;

}

.menu a{

text-decoration:none;

padding:14px 18px;

border-radius:12px;

color:white;

font-size:17px;

transition:.3s;

}

.menu a:hover{

background:#C1121F;

color:#FFD700;

padding-left:25px;

}

.active{

background:#C1121F;

color:#FFD700 !important;

font-weight:bold;

}

.loginBtn{

width:100%;

height:50px;

border:none;

border-radius:12px;

background:#FFD700;

color:#111827;

font-size:17px;

font-weight:bold;

cursor:pointer;

transition:.3s;

}

.loginBtn:hover{

background:#C1121F;

color:white;

}

`}</style>
<nav className="navbar">

    <div className="logo">

        ⚡ ElectroHub

    </div>

    {

        userName && (

            <div className="userBox">

                <h3>

                    Welcome

                </h3>

                <h2>

                    {userName}

                </h2>

            </div>

        )

    }

    <div className="menu">

        <Link
        className={location.pathname==="/" ? "active" : ""}
        to="/"
        >
            🏠 Home
        </Link>

        <Link
        className={location.pathname==="/products" ? "active" : ""}
        to="/products"
        >
            📦 Products
        </Link>

        <Link
        className={location.pathname==="/cart" ? "active" : ""}
        to="/cart"
        >
            🛒 Cart
        </Link>

        <Link
        className={location.pathname==="/about" ? "active" : ""}
        to="/about"
        >
            ℹ️ About
        </Link>

        <Link
        className={location.pathname==="/contact" ? "active" : ""}
        to="/contact"
        >
            📞 Contact
        </Link>

        

        <Link
        className={location.pathname==="/profile" ? "active" : ""}
        to="/profile"
        >
            
            👤 Profile
        </Link>
        {role === "SUPER_ADMIN" && (

    <Link
        className={location.pathname === "/super-admin" ? "active" : ""}
        to="/super-admin"
    >
        👑 Super Admin
    </Link>

)}

{role === "ADMIN" && (

    <Link
        className={location.pathname === "/admin" ? "active" : ""}
        to="/admin"
    >
        ⚙ Admin
    </Link>

)}

    </div>    {

        userName ? (

            <button
                className="loginBtn"
                onClick={logout}
            >

                🚪 Logout

            </button>

        ) : (

            <button
                className="loginBtn"
                onClick={() => navigate("/login")}
            >

                🔐 Login

            </button>

            

        )

    }

</nav>

</>

);

}

export default Navbar;