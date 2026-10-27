import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function Products() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const response = await API.get("/product/all");

            setProducts(response.data);

        } catch (error) {

            console.log(error);

            errorPopup(
    "Load Failed",
    "Unable To Load Products"
);

        }

    };

const addToCart = async (product) => {

    try {

        const userId = localStorage.getItem("userId");

        if (!userId) {

            warningPopup(
                "Login Required",
                "Please Login First"
            );

            navigate("/login");
            return;
        }

        await API.post("/cart/add", {
            userId: Number(userId),
            productId: product.id,
            quantity: 1
        });

        await successPopup(
            "Success",
            "Product Added To Cart Successfully"
        );

    } catch (error) {

        console.log(error);

        await errorPopup(
            "Error",
            "Unable To Add Product"
        );

    }

};

    const filteredProducts = products.filter((product) =>

        product.name.toLowerCase().includes(search.toLowerCase()) ||

        product.category.toLowerCase().includes(search.toLowerCase())

    );

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

margin-left:250px;
width:calc(100% - 250px);
padding:30px;
box-sizing:border-box;

}

.title{

text-align:center;
font-size:48px;
font-weight:700;
color:#C1121F;
margin-bottom:35px;

}

.searchBox{

display:flex;
justify-content:center;
margin-bottom:40px;

}

.searchBox input{

width:650px;
height:55px;
padding:15px 20px;
font-size:17px;
border:2px solid #ddd;
border-radius:12px;
outline:none;
transition:.3s;

}

.searchBox input:focus{

border-color:#C1121F;
box-shadow:0 0 12px rgba(193,18,31,.25);

}

.grid{

display:grid;
grid-template-columns:repeat(3,1fr);
gap:30px;
justify-items:center;
align-items:start;
width:100%;

}

.card{

width:100%;
max-width:400px;
background:#fffaf3;
border-radius:22px;
padding:25px;
box-shadow:0 12px 25px rgba(0,0,0,.15);
transition:.3s;
text-align:center;
min-height:700px;
display:flex;
flex-direction:column;
justify-content:space-between;

}

.card:hover{

transform:translateY(-10px);
box-shadow:0 18px 40px rgba(0,0,0,.20);

}

.card img{

width:100%;
height:300px;
object-fit:contain;
padding:20px;

}

.card h2{

font-size:34px;
margin-top:20px;
min-height:80px;
color:#111827;

}

.category{

font-size:18px;
margin-top:10px;
color:#666;

}

.price{

font-size:32px;
font-weight:bold;
color:#C1121F;
margin:20px 0;

}

.description{

padding:20px;
font-size:18px;
line-height:30px;
color:#555;
min-height:90px;

}

.rating{

display:inline-block;
background:#FFD700;
color:#111827;
padding:6px 14px;
border-radius:20px;
font-weight:bold;
margin-top:15px;

}

.stock{

display:inline-block;
margin-left:12px;
background:#198754;
color:white;
padding:6px 14px;
border-radius:20px;
font-weight:bold;

}

.buttonArea{

display:flex;
justify-content:center;
gap:15px;
margin-top:25px;
flex-wrap:wrap;

}

.cartBtn{

width:180px;
height:50px;
border:none;
border-radius:12px;
background:#C1121F;
color:white;
font-size:16px;
font-weight:bold;
cursor:pointer;
transition:.3s;

}

.cartBtn:hover{

background:#8B0000;

}

.detailsBtn{

width:180px;
height:50px;
border:none;
border-radius:12px;
background:#FFD700;
color:#111827;
font-size:16px;
font-weight:bold;
cursor:pointer;
transition:.3s;

}

.detailsBtn:hover{

background:#E6C200;

}

@media(max-width:1400px){

.grid{

grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:768px){

.container{

margin-left:0;
width:100%;
padding:20px;

}

.grid{

grid-template-columns:1fr;

}

.card{

max-width:400px;

}

.searchBox input{

width:100%;

}

}
`}</style>
<div className="container">

<h1 className="title">

🛍 Our Products

</h1>

<div className="searchBox">

<input
type="text"
placeholder="🔍 Search Products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<div className="grid">

{

filteredProducts.map((product)=>(

<div
className="card"
key={product.id}
>

<img
src={product.image}
alt={product.name}
/>

<h2>

{product.name}

</h2>

<div className="category">

📂 {product.category}

</div>

<div>

<span className="rating">

⭐ 4.8

</span>

<span className="stock">

{product.stock>0?"In Stock":"Out Of Stock"}

</span>

</div>

<div className="price">

₹ {product.price}

</div>

<div className="description">

{product.description}

</div>

<div className="buttonArea">

<button

className="cartBtn"

onClick={()=>addToCart(product)}

>

🛒 Add To Cart

</button>


</div>

</div>

))

}

{

filteredProducts.length===0 && (

<h2
style={{
textAlign:"center",
width:"100%",
color:"#C1121F",
marginTop:"50px"
}}
>

No Products Found

</h2>

)

}

</div>
<h1 className="title" style={{marginTop:"70px"}}>

🏆 Top Brands

</h1>

<div className="grid">

<div className="card">

<div
style={{
fontSize:"70px",
padding:"40px"
}}
>

⚡

</div>

<h2>Arduino</h2>

<p className="description">

Original Arduino Development Boards

</p>

</div>

<div className="card">

<div
style={{
fontSize:"70px",
padding:"40px"
}}
>

📡

</div>

<h2>ESP32</h2>

<p className="description">

WiFi & Bluetooth IoT Boards

</p>

</div>

<div className="card">

<div
style={{
fontSize:"70px",
padding:"40px"
}}
>

💻

</div>

<h2>Raspberry Pi</h2>

<p className="description">

Mini Computer Development Kits

</p>

</div>

</div>
<div
style={{
marginTop:"70px",
background:"linear-gradient(135deg,#C1121F,#7A0912)",
padding:"60px",
borderRadius:"20px",
textAlign:"center",
color:"white"
}}
>

<h1
style={{
color:"#FFD700",
marginBottom:"20px"
}}
>

📧 Subscribe to ElectroHub

</h1>

<p
style={{
fontSize:"20px",
marginBottom:"25px"
}}
>

Get updates about new products and exclusive offers.

</p>

<input

type="email"

placeholder="Enter your Email"

style={{
width:"450px",
height:"55px",
border:"none",
borderRadius:"10px",
paddingLeft:"20px",
fontSize:"16px"
}}

/>

<button

style={{
width:"180px",
height:"55px",
marginLeft:"15px",
border:"none",
borderRadius:"10px",
background:"#FFD700",
fontWeight:"bold",
cursor:"pointer"
}}

>

Subscribe

</button>

</div>
<footer
style={{
marginTop:"70px",
background:"#111827",
padding:"45px",
borderRadius:"20px",
color:"white",
textAlign:"center"
}}
>

<h2
style={{
color:"#FFD700",
marginBottom:"15px"
}}
>

⚡ ElectroHub

</h2>

<p>

India's Trusted Electronics Shopping Platform

</p>

<p
style={{
marginTop:"15px"
}}
>

© 2026 ElectroHub | All Rights Reserved

</p>

</footer>

</div>

</>

);

}

export default Products;