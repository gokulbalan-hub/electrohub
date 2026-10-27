import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";
import {
    confirmPopup,
    warningPopup
} from "../utils/Popup";

function SuperAdmin() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const role = localStorage.getItem("role");

        if (role !== "SUPER_ADMIN") {

            warningPopup(
                "Access Denied",
                "Only Super Admin can access this page."
            );

            navigate("/");

            return;

        }

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const usersRes = await API.get("/user/all");

            setUsers(usersRes.data);

            const productsRes = await API.get("/product/all");

            setProducts(productsRes.data);

            const ordersRes = await API.get("/orders/all");

            setOrders(ordersRes.data);

        } catch (error) {

            console.log(error);

        }

    };

    const totalAdmins = users.filter(
        user => user.role === "ADMIN"
    ).length;

    const logout = async () => {

        const ok = await confirmPopup(
            "Logout",
            "Are you sure you want to logout?"
        );

        if (!ok) return;

        localStorage.clear();

        navigate("/login");

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
background:linear-gradient(160deg,#2b060b 0%,#170307 100%);
}

.container{
margin-left:270px;
padding:30px;
min-height:100vh;
}

.title{
text-align:center;
font-size:45px;
color:#FFD700;
margin-bottom:35px;
font-weight:bold;
}

.cardGrid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:25px;
margin-bottom:40px;
}

.card{
background:#fffaf3;
padding:30px;
border-radius:18px;
text-align:center;
box-shadow:0 10px 20px rgba(0,0,0,.25);
transition:.3s;
}

.card:hover{
transform:translateY(-5px);
}

.card h1{
font-size:42px;
color:#C1121F;
margin-bottom:10px;
}

.card h3{
color:#333;
}

.buttonGrid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;
margin-top:20px;
}

.menuBtn{
height:60px;
border:none;
border-radius:12px;
font-size:18px;
font-weight:bold;
cursor:pointer;
transition:.3s;
color:white;
}

.menuBtn:hover{
transform:scale(1.05);
}

.users{
background:#198754;
}

.products{
background:#B8860B;
}

.orders{
background:#0d6efd;
}

.feedback{
background:#C1121F;
}

.logout{
background:#6c757d;
}

`}</style>

<div className="container">

<h1 className="title">

👑 Super Admin Dashboard

</h1>

<div className="cardGrid">

<div className="card">

<h1>{users.length}</h1>

<h3>👥 Total Users</h3>

</div>

<div className="card">

<h1>{totalAdmins}</h1>

<h3>🟢 Total Admins</h3>

</div>

<div className="card">

<h1>{products.length}</h1>

<h3>📦 Products</h3>

</div>

<div className="card">

<h1>{orders.length}</h1>

<h3>🧾 Orders</h3>

</div>

</div>
<div className="buttonGrid">

<button
className="menuBtn users"
onClick={() => navigate("/admin/users")}
>

👥 Manage Users

</button>

<button
className="menuBtn products"
onClick={() => navigate("/admin")}
>

📦 Manage Products

</button>

<button
className="menuBtn orders"
onClick={() => navigate("/manage-orders")}
>

📋 Manage Orders

</button>

<button
className="menuBtn feedback"
onClick={() => navigate("/manage-feedback")}
>

💬 Manage Feedback

</button>

<button
className="menuBtn logout"
onClick={logout}
>

🚪 Logout

</button>

</div>

<div
style={{
marginTop:"50px",
background:"#fffaf3",
padding:"30px",
borderRadius:"20px",
boxShadow:"0 10px 20px rgba(0,0,0,.25)"
}}
>

<h2
style={{
color:"#C1121F",
marginBottom:"20px"
}}
>

👑 Super Admin Privileges

</h2>

<ul
style={{
fontSize:"18px",
lineHeight:"40px",
paddingLeft:"20px"
}}
>

<li>✅ Create and Manage Admin Accounts</li>

<li>✅ Change USER ↔ ADMIN Roles</li>

<li>✅ Delete USER / ADMIN Accounts</li>

<li>❌ SUPER_ADMIN Role Cannot Be Changed</li>

<li>❌ SUPER_ADMIN Cannot Be Deleted</li>

<li>✅ Manage Products</li>

<li>✅ Manage Orders</li>

<li>✅ Manage Customer Feedback</li>

<li>✅ Full System Access</li>

</ul>

</div>  
<div
style={{
marginTop:"40px",
textAlign:"center",
color:"white",
fontSize:"18px",
fontWeight:"bold"
}}
>

ElectroHub Super Admin Control Panel

</div>

</div>

</>

);

}

export default SuperAdmin;