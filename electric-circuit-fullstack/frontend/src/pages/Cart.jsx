import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function Cart() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {

        const userId = localStorage.getItem("userId");

        if (!userId) {

warningPopup(
    "Login Required",
    "Please Login"
);
            navigate("/login");

            return;

        }

        loadCart();

    }, []);

    const loadCart = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await API.get(`/cart/${userId}`);
            console.log(response.data);

            setCartItems(response.data);

            let total = 0;

            response.data.forEach(item => {

                total += item.price * item.quantity;

            });

            setGrandTotal(total);

localStorage.setItem("grandTotal", total);

        } catch (error) {

            console.log(error);

        }

    };

    const increaseQty = async (item) => {

        await API.put(`/cart/increase/${item.id}`);

        loadCart();

    };

    const decreaseQty = async (item) => {

        await API.put(`/cart/decrease/${item.id}`);

        loadCart();

    };

    const deleteItem = async (id) => {

        await API.delete(`/cart/${id}`);
        successPopup(
    "Deleted",
    "Item Removed From Cart"
);


        loadCart();

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

body{
background:#f5f5f5;
overflow-x:hidden;
}

.container{

width:100%;

min-height:100vh;

padding:30px;

background:#f5f5f5;

}

.title{

text-align:center;

font-size:48px;

font-weight:bold;

color:#C1121F;

margin-bottom:40px;

}

.cartCard{

display:flex;

align-items:center;

justify-content:space-between;

background:white;

padding:25px;

margin-bottom:25px;

border-radius:20px;

box-shadow:0 10px 30px rgba(0,0,0,.12);

transition:.3s;

}

.cartCard:hover{

transform:translateY(-6px);

box-shadow:0 18px 40px rgba(0,0,0,.18);

}

.productImage{

width:180px;

height:180px;

object-fit:contain;

border-radius:12px;

background:#fff;

padding:10px;

border:1px solid #ddd;

}

.productInfo{

flex:1;

margin-left:30px;

}

.productName{

font-size:30px;

font-weight:bold;

color:#111827;

margin-bottom:10px;

}

.price{

font-size:22px;

font-weight:bold;

color:#C1121F;

margin:10px 0;

}

.total{

font-size:22px;

font-weight:bold;

color:#FFD700;

margin:10px 0;

}

.qtyBox{

display:flex;

align-items:center;

gap:15px;

margin-top:20px;

}

.qtyBtn{

width:45px;

height:45px;

border:none;

border-radius:10px;

font-size:22px;

font-weight:bold;

cursor:pointer;

}

.minus{

background:#C1121F;

color:white;

}

.plus{

background:#198754;

color:white;

}

.deleteBtn{

width:180px;

height:50px;

border:none;

border-radius:10px;

background:#dc3545;

color:white;

font-size:16px;

font-weight:bold;

cursor:pointer;

margin-top:25px;

}

.summary{

margin-top:40px;

background:white;

padding:35px;

border-radius:20px;

box-shadow:0 10px 30px rgba(0,0,0,.12);

}

.summary h2{

text-align:center;

font-size:34px;

color:#C1121F;

margin-bottom:25px;

}

.summaryRow{

display:flex;

justify-content:space-between;

margin:20px 0;

font-size:20px;

}

.checkoutBtns{

display:flex;

justify-content:center;

gap:20px;

margin-top:35px;

flex-wrap:wrap;

}

.btn{

width:240px;

height:52px;

border:none;

border-radius:12px;

font-size:17px;

font-weight:bold;

cursor:pointer;

transition:.3s;

}

.shopBtn{

background:#FFD700;

color:#111827;

}

.checkoutBtn{

background:#C1121F;

color:white;

}

.logoutBtn{

background:#111827;

color:white;

}

.btn:hover{

transform:scale(1.05);

}

`}</style>
<div className="container">

<h1 className="title">

🛒 My Shopping Cart

</h1>

{
cartItems.map((item) => {

console.log("Image URL:", item.image);

return (

<div className="cartCard" key={item.id}>

<img
  className="productImage"
  src={item.image}
  alt={item.productName}
/>

<div className="productInfo">

<div className="productName">
{item.productName}
</div>

<div className="price">
💰 Price : ₹ {item.price}
</div>

<div className="total">
Total : ₹ {(item.price || 0) * (item.quantity || 0)}
</div>

<div className="qtyBox">

<button
className="qtyBtn minus"
onClick={()=>decreaseQty(item)}
>
-
</button>

<span
style={{
fontSize:"24px",
fontWeight:"bold"
}}
>
{item.quantity}
</span>

<button
className="qtyBtn plus"
onClick={()=>increaseQty(item)}
>
+
</button>

</div>

<button
className="deleteBtn"
onClick={()=>deleteItem(item.id)}
>
🗑 Remove
</button>

</div>

</div>

);

})
}   
<div className="summary">

<h2>

Order Summary

</h2>

<div className="summaryRow">

<span>

Items Total

</span>

<span>

₹ {grandTotal}

</span>

</div>

<div className="summaryRow">

<span>

Delivery

</span>

<span
style={{
color:"green"
}}
>

FREE

</span>

</div>

<div className="summaryRow">

<span>

Discount

</span>

<span
style={{
color:"green"
}}
>

₹ 0

</span>

</div>

<hr/>

<div

className="summaryRow"

style={{
marginTop:"25px",
fontWeight:"bold",
fontSize:"24px"
}}

>

<span>

Grand Total

</span>

<span
style={{
color:"#C1121F"
}}
>

₹ {grandTotal}

</span>

</div>
<div className="checkoutBtns">

<button

className="btn shopBtn"

onClick={()=>navigate("/products")}

>

🛍 Continue Shopping

</button>

<button

className="btn checkoutBtn"

onClick={()=>navigate("/checkout")}

>

💳 Proceed To Checkout

</button>

<button

className="btn logoutBtn"

onClick={()=>{

localStorage.clear();

navigate("/login");

}}

>

🚪 Logout

</button>

</div>

</div>

</div>

</>

);

}

export default Cart;