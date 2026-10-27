import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";

function MyOrders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const userId = localStorage.getItem("userId");

            if (!userId) {

warningPopup(
    "Login Required",
    "Please Login"
);

                navigate("/login");

                return;

            }

            const response = await API.get(`/orders/user/${userId}`);

            setOrders(response.data);

        } catch (error) {

            console.log(error);

errorPopup(
    "Failed",
    "Unable To Load Orders"
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
background:linear-gradient(135deg,#ffffff,#fff8e8);
}
.container{

margin-left:270px;

padding:30px;

min-height:100vh;

width:calc(100% - 270px);

}
.title{

text-align:center;

font-size:45px;

font-weight:bold;

color:#C1121F;

margin-bottom:35px;

}

.orderGrid{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(420px,1fr));

gap:25px;

}

.orderCard{

background:#fffaf3;

border-radius:20px;

padding:25px;

box-shadow:0 10px 25px rgba(60,5,10,.25);

transition:.3s;

}

.orderCard:hover{

transform:translateY(-5px);

}

.orderTitle{

font-size:22px;

font-weight:bold;

margin-bottom:20px;

color:#c1121f;

}

.info{

margin:10px 0;

font-size:17px;

}

.status{

display:inline-block;

padding:8px 18px;

border-radius:20px;

font-weight:bold;

background:#b8860b;

color:white;

margin-top:15px;

}

.amount{

font-size:26px;

font-weight:bold;

color:#b8860b;

margin-top:20px;

}

.btn{

width:220px;

height:48px;

border:none;

border-radius:10px;

font-size:16px;

font-weight:bold;

cursor:pointer;

margin-top:25px;

background:#c1121f;

color:white;

}

`}</style>

<div className="container">

<h1 className="title">

📦 My Orders

</h1>

<div className="orderGrid">
    {

orders.length > 0 ?

orders.map((order) => (

<div
className="orderCard"
key={order.id}
>

<div className="orderTitle">

🧾 Order # {order.id}

</div>

<div className="info">

<b>👤 Customer :</b> {order.fullName || order.userName}

</div>

<div className="info">

<b>📱 Mobile :</b> {order.mobile || "-"}

</div>

<div className="info">

<b>💳 Payment :</b> {order.paymentMethod}

</div>

<div className="info">

<b>📍 Address :</b>

{order.address},

{" "}

{order.city},

{" "}

{order.state}

-

{order.pincode}

</div>

<div className="info">

<b></b>

</div>

<div className="amount">

💰 Total Amount : ₹ {order.totalAmount}

</div>

<div
className="status"
style={{

background:

order.orderStatus === "DELIVERED"

? "#b8860b"

: order.orderStatus === "SHIPPED"

? "#c1121f"

: order.orderStatus === "PROCESSING"

? "#fd7e14"

: order.orderStatus === "CANCELLED"

? "#e63946"

: "#6c757d"

}}

>

🚚 {order.orderStatus}

</div>

</div>

))

:

<div
style={{
width:"100%",
textAlign:"center",
color:"white",
marginTop:"80px"
}}
>

<h2
style={{
color:"#C1121F",
fontSize:"38px",
fontWeight:"700",
marginTop:"20px"
}}
>
No Orders Found
</h2>

<p
style={{
marginTop:"15px",
fontSize:"18px",
color:"#555",
fontWeight:"500"
}}
>

You haven't placed any orders yet.

</p>

<button
className="btn"
onClick={()=>navigate("/products")}
>

🛍 Shop Now

</button>

</div>

}

</div>

<div
style={{
textAlign:"center",
marginTop:"40px"
}}
>

<button
className="btn"
style={{
background:"linear-gradient(135deg, #ffe066 0%, #d4af37 100%)",
color:"#000"
}}
onClick={()=>navigate("/profile")}
>

⬅ Back To Profile

</button>

</div>

</div>

</>

);

}

export default MyOrders;