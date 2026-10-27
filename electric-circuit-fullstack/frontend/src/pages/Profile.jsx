import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";
import {
    successPopup,
    confirmPopup
} from "../utils/Popup";

function Profile() {

    const navigate = useNavigate();

    const [user, setUser] = useState({

        name:"",
        email:"",
        role:""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try{

            const userId = localStorage.getItem("userId");

            const response = await API.get(`/user/${userId}`);

            setUser(response.data);

        }catch(error){

            console.log(error);

        }

    };

const logout = async () => {

    const ok = await confirmPopup(
        "Logout?",
        "Are you sure you want to logout?"
    );

    if (!ok) {
        return;
    }

    localStorage.clear();

    await successPopup(
        "Logged Out",
        "See you again!"
    );

    navigate("/login");

};

    return(

    <>
    <style>{`

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:#f5f5f5;
}

.container{

width:100%;

min-height:100vh;

padding:35px;

}

.profileCard{

background:white;

border-radius:20px;

padding:40px;

box-shadow:0 10px 30px rgba(0,0,0,.12);

text-align:center;

}

.avatar{

width:140px;

height:140px;

border-radius:50%;

background:#C1121F;

color:white;

font-size:60px;

display:flex;

justify-content:center;

align-items:center;

margin:auto;

margin-bottom:25px;

}

.name{

font-size:36px;

font-weight:bold;

color:#111827;

}

.email{

font-size:18px;

color:#666;

margin-top:12px;

}

.role{

display:inline-block;

margin-top:18px;

background:#FFD700;

padding:8px 20px;

border-radius:20px;

font-weight:bold;

}

.stats{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:25px;

margin-top:40px;

}

.stat{

background:white;

padding:30px;

border-radius:18px;

text-align:center;

box-shadow:0 10px 20px rgba(0,0,0,.08);

}

.stat h1{

font-size:40px;

color:#C1121F;

margin-bottom:10px;

}

.buttons{

display:flex;

justify-content:center;

gap:20px;

margin-top:40px;

flex-wrap:wrap;

}

.btn{

width:220px;

height:52px;

border:none;

border-radius:12px;

font-size:16px;

font-weight:bold;

cursor:pointer;

}

.editBtn{

background:#FFD700;

}

.orderBtn{

background:#198754;

color:white;

}

.logoutBtn{

background:#C1121F;

color:white;

}

`}</style>
<div className="container">

<div className="profileCard">

<div className="avatar">

👤

</div>

<div className="name">

{user.name}

</div>

<div className="email">

📧 {user.email}

</div>



</div>



{/* Buttons */}

<div className="buttons">

<button

className="btn editBtn"

onClick={()=>navigate("/edit-profile")}

>

✏ Edit Profile

</button>

<button

className="btn orderBtn"

onClick={()=>navigate("/my-orders")}

>

📦 My Orders

</button>

<button

className="btn logoutBtn"

onClick={logout}

>

🚪 Logout

</button>

</div>

{/* Account Information */}

<div
style={{
marginTop:"50px",
background:"white",
padding:"30px",
borderRadius:"20px",
boxShadow:"0 10px 30px rgba(0,0,0,.10)"
}}
>

<h2
style={{
color:"#C1121F",
marginBottom:"25px",
textAlign:"center"
}}
>

👤 Account Information

</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"20px"
}}
>

<div>

<strong>Full Name</strong>

<p>{user.name}</p>

</div>

<div>

<strong>Email</strong>

<p>{user.email}</p>

</div>



<div>

<strong>Member Since</strong>

<p>2025</p>

</div>

</div>

</div>

</div>

</>

);

}

export default Profile;