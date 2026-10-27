import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function Checkout() {

    const navigate = useNavigate();

    const [order, setOrder] = useState({

        fullName: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        payment: "Cash On Delivery",

        // New Fields
        productNames: "",
        productDetails: "",
        totalItems: 0

    });

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

        loadCart();

    }, []);

    const loadCart = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await API.get(`/cart/${userId}`);

            setCartItems(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setOrder({

            ...order,

            [e.target.name]: e.target.value

        });

    };
        const placeOrder = async () => {

        try {

            const userId = localStorage.getItem("userId");

            // Build Product Names
            const productNames = cartItems
                .map(item => item.productName)
                .join(", ");

            // Build Product Details
            const productDetails = cartItems
                .map(item =>
                    `${item.productName} x ${item.quantity} (₹${item.totalAmount})`
                )
                .join(" | ");

            // Total Items
            const totalItems = cartItems.reduce(
                (total, item) => total + item.quantity,
                0
            );

            const now = new Date().toISOString();

            await API.post("/orders/place", {

                userId: Number(userId),

                fullName: order.fullName,
                mobile: order.mobile,
                address: order.address,
                city: order.city,
                state: order.state,
                pincode: order.pincode,

                paymentMethod: order.payment,

                totalAmount:
                    Number(localStorage.getItem("grandTotal")) || 0,

                // New Fields
                productNames: productNames,

                productDetails: productDetails,

                totalItems: totalItems,

                orderDate: now,

                statusUpdatedDate: now,

                orderStatus: "PLACED"

            });

await successPopup(
    "Order Placed",
    "Thank you for your purchase."
);
            navigate("/profile");

        } catch (error) {

            console.log(error);

await errorPopup(
    "Order Failed",
    "Please try again."
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
}

.container{
padding:40px;
min-height:100vh;
}

.title{
text-align:center;
font-size:42px;
color:#FFD700;
margin-bottom:35px;
font-weight:bold;
}

.checkoutCard{

background:white;
padding:35px;
border-radius:20px;
box-shadow:0 15px 35px rgba(0,0,0,.12);
border-top:8px solid #C1121F;

}

.row{

display:flex;
gap:20px;
margin-bottom:20px;
flex-wrap:wrap;

}

.inputGroup{

flex:1;
display:flex;
flex-direction:column;

}

.inputGroup label{

font-weight:600;
margin-bottom:8px;
color:#333;

}

.inputGroup input,
.inputGroup textarea,
.inputGroup select{

width:100%;
padding:14px;
font-size:16px;
border:1px solid #ccc;
border-radius:10px;
outline:none;

}

.inputGroup textarea{

height:120px;
resize:none;

}

.summary{

margin-top:35px;
padding:25px;
background:#f7ede1;
border-radius:15px;

}

.summary h2{

margin-bottom:20px;
color:#3a0d14;

}

.summary p{

font-size:16px;
margin:8px 0;

}

.productList{

margin-top:20px;
padding:15px;
background:white;
border-radius:10px;
border:1px solid #ddd;

}

.productItem{

display:flex;
justify-content:space-between;
padding:8px 0;
border-bottom:1px solid #eee;
font-size:15px;

}

.productItem:last-child{

border-bottom:none;

}

.total{

font-size:24px;
font-weight:bold;
color:#B8860B;
margin-top:20px;

}

.btn{

width:230px;
height:50px;
border:none;
border-radius:10px;
font-size:16px;
font-weight:bold;
cursor:pointer;
transition:.3s;

}

.btn:hover{

transform:translateY(-2px);

}

.backBtn{

background:#FFD54F;
color:#222;

}

.shopBtn{

background:#C1121F;
color:white;

}

.placeBtn{

background:#B8860B;
color:white;

}
`}</style><div className="container">

    <h1 className="title">
        💳 Checkout
    </h1>

    <div className="checkoutCard">

        <div className="row">

            <div className="inputGroup">

                <label>Full Name</label>

                <input
                    type="text"
                    name="fullName"
                    value={order.fullName}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="inputGroup">

                <label>Mobile Number</label>

                <input
                    type="text"
                    name="mobile"
                    value={order.mobile}
                    onChange={handleChange}
                    required
                />

            </div>

        </div>

        <div className="inputGroup">

            <label>Delivery Address</label>

            <textarea
                name="address"
                value={order.address}
                onChange={handleChange}
                required
            ></textarea>

        </div>

        <div className="row">

            <div className="inputGroup">

                <label>City</label>

                <input
                    type="text"
                    name="city"
                    value={order.city}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="inputGroup">

                <label>State</label>

                <input
                    type="text"
                    name="state"
                    value={order.state}
                    onChange={handleChange}
                    required
                />

            </div>

        </div>

        <div className="row">

            <div className="inputGroup">

                <label>Pincode</label>

                <input
                    type="text"
                    name="pincode"
                    value={order.pincode}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="inputGroup">

                <label>Payment Method</label>

                <select
                    name="payment"
                    value={order.payment}
                    onChange={handleChange}
                >

                    <option>Cash On Delivery</option>
                    <option>UPI</option>
                    <option>Credit Card</option>
                    <option>Debit Card</option>

                </select>

            </div>

        </div>

        <div className="summary">

            <h2>🛒 Ordered Products</h2>

            <div className="productList">

                {

                    cartItems.map((item) => (

                        <div
                            className="productItem"
                            key={item.id}
                        >

                            <span>

                                {item.productName}

                            </span>

                            <span>

                                Qty : {item.quantity}

                            </span>

                            <span>

                                ₹ {item.totalAmount}

                            </span>

                        </div>

                    ))

                }

            </div>

            <h3
                style={{
                    marginTop: "20px",
                    color: "#3a0d14"
                }}
            >
                Total Items :
                {

                    cartItems.reduce(
                        (sum, item) =>
                            sum + item.quantity,
                        0
                    )

                }
            </h3>

            <div className="total">

                Grand Total :

                ₹ {localStorage.getItem("grandTotal") || 0}

            </div>            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "30px",
                    flexWrap: "wrap"
                }}
            >

                <button
                    className="btn backBtn"
                    onClick={() => navigate("/cart")}
                >
                    🛒 Back To Cart
                </button>

                <button
                    className="btn shopBtn"
                    onClick={() => navigate("/products")}
                >
                    🛍 Continue Shopping
                </button>

                <button
                    className="btn placeBtn"
                    onClick={placeOrder}
                >
                    ✅ Place Order
                </button>

            </div>

        </div>

    </div>

</div>

</>

    );

}

export default Checkout;