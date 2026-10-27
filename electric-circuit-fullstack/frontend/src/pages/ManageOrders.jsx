import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    confirmPopup
} from "../utils/Popup";

function ManageOrders() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const response = await API.get("/orders/all");

            setOrders(response.data);

        } catch (error) {

            console.log(error);

            await errorPopup(
                "Failed",
                "Unable To Load Orders"
            );

        }

    };

    const updateStatus = async (id, status) => {

        try {

            await API.put(`/orders/status/${id}?status=${status}`);

            setSelectedStatus(prev => ({
                ...prev,
                [id]: status
            }));

            await successPopup(
                "Success",
                "Order Status Updated Successfully"
            );

            loadOrders();

        } catch (error) {

            console.log(error);

            await errorPopup(
                "Failed",
                "Unable To Update Status"
            );

        }

    };

    const deleteOrder = async (id) => {

        const ok = await confirmPopup(
            "Delete Order?",
            "This action cannot be undone."
        );

        if (!ok) return;

        try {

            await API.delete(`/orders/${id}`);

            await successPopup(
                "Deleted",
                "Order Deleted Successfully"
            );

            loadOrders();

        } catch (error) {

            console.log(error);

            await errorPopup(
                "Failed",
                "Unable To Delete Order"
            );

        }

    };

    const filteredOrders = orders.filter((order) => {

        return (

            (order.fullName || order.userName || "")
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            (order.mobile || "")
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            (order.paymentMethod || "")
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            (order.orderStatus || "")
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    });

    return (

        <>
        <style>{`

body{
background:linear-gradient(160deg,#2b060b 0%,#170307 100%);
font-family:'Segoe UI',sans-serif;
}

.container-fluid{
margin-left:270px;
padding:30px;
width:calc(100% - 270px);
min-height:100vh;
}

.title{
text-align:center;
font-size:42px;
color:#FFD700;
margin-bottom:30px;
font-weight:bold;
}

.searchBox{
width:380px;
height:48px;
padding-left:15px;
border:none;
border-radius:10px;
font-size:16px;
margin-bottom:25px;
outline:none;
}

.table{
background:#fffaf3;
border-radius:15px;
overflow:hidden;
box-shadow:0 0 15px rgba(0,0,0,.3);
}

.table th{
background:#3a0d14;
color:white;
padding:18px;
text-align:center;
font-size:16px;
vertical-align:middle;
}

.table td{
padding:15px;
text-align:center;
vertical-align:middle;
font-size:15px;
color:#3a0d14;
font-weight:500;
}

.address{
text-align:left;
min-width:260px;
line-height:24px;
font-size:14px;
}

.status{
width:170px;
height:42px;
border-radius:8px;
border:1px solid #ccc;
padding-left:10px;
font-weight:bold;
background:white;
cursor:pointer;
}

.btn-sm{
width:90px;
height:38px;
border:none;
border-radius:8px;
cursor:pointer;
font-size:14px;
font-weight:bold;
margin:2px;
}

.saveBtn{
background:#b8860b;
color:white;
transition:.3s;
}

.saveBtn:hover{
background:#8d6707;
}

.deleteBtn{
background:#dc3545;
color:white;
transition:.3s;
}

.deleteBtn:hover{
background:#bb2d3b;
}

.currentStatus{
padding:8px 15px;
border-radius:8px;
font-size:14px;
font-weight:bold;
display:inline-block;
min-width:120px;
background:#e9ecef;
color:#3a0d14;
}

.footerCount{
margin-top:30px;
text-align:center;
color:white;
font-size:22px;
font-weight:bold;
}

`}</style>

<div className="container-fluid">

<h1 className="title">
📦 Manage Orders
</h1>

<input
className="searchBox"
type="text"
placeholder="🔍 Search Customer / Mobile / Payment / Status..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<table className="table table-bordered">

<thead>

<tr>

<th>Order ID</th>
<th>Customer</th>
<th>Mobile</th>
<th>Delivery Address</th>
<th>Payment</th>
<th>Total</th>
<th>Change Status</th>
<th>Current Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{

filteredOrders.map((order)=>(

<tr key={order.id}>

<td>{order.id}</td>

<td>{order.fullName || order.userName}</td>

<td>{order.mobile}</td>

<td className="address">

<strong>Address :</strong>

<br/>

{order.address}

<br/>

{order.city}, {order.state}

<br/>

PIN : {order.pincode}

</td>

<td>{order.paymentMethod}</td>

<td>₹ {order.totalAmount}</td>

<td>

<select
className="status"
defaultValue={order.orderStatus}
onChange={(e)=>
setSelectedStatus({
...selectedStatus,
[order.id]:e.target.value
})
}
>

<option value="PLACED">PLACED</option>
<option value="PROCESSING">PROCESSING</option>
<option value="SHIPPED">SHIPPED</option>
<option value="DELIVERED">DELIVERED</option>
<option value="CANCELLED">CANCELLED</option>

</select>

</td>

<td>

<span className="currentStatus">

{selectedStatus[order.id] || order.orderStatus}

</span>

</td>

<td>
    <button
className="btn-sm saveBtn"
onClick={() =>
    updateStatus(
        order.id,
        selectedStatus[order.id] || order.orderStatus
    )
}
>
💾 Save
</button>

<br />

<button
className="btn-sm deleteBtn"
onClick={() => deleteOrder(order.id)}
>
🗑 Delete
</button>

</td>

</tr>

))

}

{

filteredOrders.length === 0 && (

<tr>

<td
colSpan="9"
style={{
padding:"30px",
fontSize:"18px",
color:"#dc3545",
fontWeight:"bold"
}}
>

No Orders Found

</td>

</tr>

)

}

</tbody>

</table>

<div className="footerCount">

Total Orders : {filteredOrders.length}

</div>

</div>

</>

);

}

export default ManageOrders;