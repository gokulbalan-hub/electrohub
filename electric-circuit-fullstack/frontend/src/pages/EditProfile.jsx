import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function EditProfile() {

    const navigate = useNavigate();

    const [user, setUser] = useState({

        name: "",
        email: "",
        password: "",
        role: ""

    });

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await API.get(`/user/${userId}`);

            setUser({

                name: response.data.name,
                email: response.data.email,
                password: "",
                role: response.data.role

            });

        } catch (error) {

            console.log(error);

errorPopup(
    "Failed",
    "Unable To Load Profile"
);
        }

    };

    const updateProfile = async () => {

        try {

            const userId = localStorage.getItem("userId");

            await API.put(`/user/update/${userId}`, user);

await successPopup(
    "Success ✨",
    "Profile Updated Successfully"
);
            localStorage.setItem("userName", user.name);

            navigate("/profile");

        } catch (error) {

            console.log(error);

await errorPopup(
    "Failed",
    "Profile Update Failed"
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
background: linear-gradient(160deg, #2b060b 0%, #170307 100%);
}

.container{

margin-left:270px;

padding:30px;

min-height:100vh;

width:calc(100% - 270px);

}
.card{

width:100%;

max-width:900px;

margin:auto;

background:#fffaf3;

padding:50px 60px;

border-radius:20px;

box-shadow:0 10px 30px rgba(60,5,10,.30);

}
.input{

width:100%;

height:60px;

padding:15px 20px;

font-size:17px;

border:1px solid #ccc;

border-radius:10px;

outline:none;

}

.formGroup{

margin-bottom:25px;

}

.formGroup label{

display:block;

font-size:17px;

font-weight:bold;

margin-bottom:8px;

}

.input{

width:100%;

height:50px;

padding:12px;

border-radius:10px;

border:1px solid #ccc;

font-size:16px;

outline:none;

}

.input:focus{

border-color:#c1121f;

box-shadow:0 0 8px rgba(193,18,31,.30);

}

.buttonArea{

display:flex;

justify-content:center;

gap:20px;

margin-top:30px;

flex-wrap:wrap;

}

.btn{

width:220px;

height:52px;

border:none;

border-radius:10px;

font-size:16px;

font-weight:bold;

cursor:pointer;

}

.saveBtn{

background:#b8860b;

color:white;

}

.backBtn{

background: linear-gradient(135deg, #ffe066 0%, #d4af37 100%); box-shadow:0 4px 15px rgba(212,175,55,.35);

}

`}</style>

<div className="container">

<div className="card">

<h1 className="title">

👤 Edit Profile

</h1><div className="formGroup">

<label>

👤 Full Name

</label>

<input
className="input"
type="text"
value={user.name}
onChange={(e)=>
setUser({
...user,
name:e.target.value
})
}
/>

</div>

<div className="formGroup">

<label>

📧 Email Address

</label>

<input
className="input"
type="email"
value={user.email}
onChange={(e)=>
setUser({
...user,
email:e.target.value
})
}
/>

</div>

<div className="formGroup">

<label>

🔒 New Password (Optional)

</label>

<input
className="input"
type="password"
placeholder="Leave empty if you don't want to change password"
value={user.password}
onChange={(e)=>
setUser({
...user,
password:e.target.value
})
}
/>

</div>

<div className="buttonArea">

<button
className="btn saveBtn"
onClick={updateProfile}
>

💾 Save Changes

</button>

<button
className="btn backBtn"
onClick={() => navigate("/profile")}
>

⬅ Back

</button>

</div>

</div>

</div>

</>

);

}

export default EditProfile;