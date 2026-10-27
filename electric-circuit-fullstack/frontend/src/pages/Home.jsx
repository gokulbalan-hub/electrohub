import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (

<>
<style>{`
.newsletter{

margin-top:70px;

background:linear-gradient(135deg,#C1121F,#7A0912);

padding:60px;

border-radius:20px;

text-align:center;

color:white;

}

.newsletter h1{

color:#FFD700;

font-size:42px;

margin-bottom:20px;

}

.newsletter p{

font-size:20px;

margin-bottom:30px;

}

.newsletterBox{

display:flex;

justify-content:center;

gap:15px;

flex-wrap:wrap;

}

.newsletterBox input{

width:450px;

height:55px;

border:none;

border-radius:12px;

padding-left:20px;

font-size:17px;

outline:none;

}

.newsletterBox button{

width:180px;

height:55px;

border:none;

border-radius:12px;

background:#FFD700;

color:#111827;

font-size:17px;

font-weight:bold;

cursor:pointer;

transition:.3s;

}

.newsletterBox button:hover{

background:white;

}

.footer{

margin-top:70px;

background:#111827;

padding:50px;

border-radius:20px 20px 0 0;

color:white;

}

.footerGrid{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(220px,1fr));

gap:40px;

}

.footer h2{

color:#FFD700;

margin-bottom:18px;

}

.footer p{

margin:12px 0;

color:#ddd;

}

.footer hr{

margin:40px 0 20px;

border:1px solid rgba(255,255,255,.12);

}

.copyright{

text-align:center;

font-size:16px;

color:#bbb;

} 

.sectionTitle{

text-align:center;

font-size:42px;

margin:60px 0 35px;

color:#C1121F;

font-weight:bold;

}

.productGrid{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(340px,1fr));

gap:30px;

}

.productCard{

background:white;

padding:25px;

border-radius:20px;

text-align:center;

box-shadow:0 10px 25px rgba(0,0,0,.12);

transition:.3s;

}

.productCard:hover{

transform:translateY(-10px);

}

.productCard img{

width:100%;

height:250px;

object-fit:contain;

}

.productCard h3{

margin-top:20px;

font-size:26px;

}

.productCard h2{

margin:20px 0;

color:#C1121F;

}

.productCard button{

width:220px;

height:50px;

border:none;

border-radius:12px;

background:#FFD700;

font-weight:bold;

cursor:pointer;

}

.productCard button:hover{

background:#C1121F;

color:white;

}

.categoryGrid{

display:grid;

grid-template-columns:repeat(4,1fr);

gap:25px;

margin-top:30px;

}

.category{

background:white;

padding:35px;

font-size:55px;

border-radius:18px;

text-align:center;

box-shadow:0 10px 25px rgba(0,0,0,.10);

transition:.3s;

}

.category:hover{

transform:translateY(-8px);

}

.reviewGrid{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:25px;

margin-top:30px;

}

.reviewCard{

background:white;

padding:30px;

border-radius:18px;

text-align:center;

box-shadow:0 10px 25px rgba(0,0,0,.10);

}

.reviewCard p{

margin:20px 0;

color:#555;

line-height:30px;

}
.searchBar{

display:flex;

justify-content:center;

gap:15px;

margin:40px 0;

}

.searchBar input{

width:650px;

height:55px;

border:2px solid #ddd;

border-radius:12px;

padding-left:20px;

font-size:17px;

outline:none;

}

.searchBar input:focus{

border-color:#C1121F;

}

.searchBar button{

width:170px;

border:none;

border-radius:12px;

background:#C1121F;

color:white;

font-size:17px;

font-weight:bold;

cursor:pointer;

}

.featureGrid{

display:grid;

grid-template-columns:repeat(4,1fr);

gap:25px;

margin:50px 0;

}

.featureCard{

background:white;

padding:35px;

border-radius:18px;

text-align:center;

box-shadow:0 10px 25px rgba(0,0,0,.10);

transition:.3s;

}

.featureCard:hover{

transform:translateY(-8px);

}

.icon{

font-size:50px;

margin-bottom:20px;

}

.featureCard h2{

color:#C1121F;

margin-bottom:10px;

}

.featureCard p{

color:#666;

}

.offerBanner{

margin-top:40px;

background:linear-gradient(135deg,#C1121F,#7A0912);

padding:60px;

border-radius:20px;

text-align:center;

color:white;

}

.offerBanner h1{

color:#FFD700;

font-size:45px;

margin-bottom:20px;

}

.offerBanner p{

font-size:20px;

margin-bottom:25px;

}

.offerBanner button{

width:240px;

height:55px;

border:none;

border-radius:12px;

background:#FFD700;

color:#111827;

font-size:18px;

font-weight:bold;

cursor:pointer;

}

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{

margin:0;

padding:0;

overflow-x:hidden;

background:#f5f5f5;

}

.home{

width:100%;

min-height:100vh;

background:#f5f5f5;

padding:25px;

}

.hero{

width:100%;

height:100vh;

display:flex;

justify-content:flex-start;

align-items:center;

padding:0 80px;

background-image:url("/images/hero/login-1.jpg");

background-size:cover;

background-position:center;

background-repeat:no-repeat;

position:relative;

}

/* Light black overlay */

.hero::before{

content:"";

position:absolute;

top:0;

left:0;

width:100%;

height:100%;

background:rgba(0,0,0,.45);

}

.heroContent h1{

font-size:72px;

font-weight:700;

color:#FFD700;

margin:20px 0;

}

.heroImage{

display:none;

}

.heroLeft{

position:relative;

z-index:2;

max-width:650px;

}

.heroLeft h4{

font-size:30px;

color:#C1121F;

margin-bottom:15px;

}
.heroContent p{

font-size:28px;

line-height:45px;

color:white;

margin-bottom:35px;

}

.heroLeft h1{

font-size:70px;

color:#FFD700;

margin-bottom:20px;

font-weight:bold;

}

.heroLeft p{

font-size:21px;

line-height:36px;

color:#555;

margin-bottom:30px;

}

.shopBtn{

width:220px;

height:60px;

border:none;

border-radius:12px;

background:#C1121F;

color:white;

font-size:20px;

font-weight:bold;

cursor:pointer;

transition:.3s;

}

.shopBtn:hover{

background:#FFD700;

color:#111827;

transform:translateY(-4px);

}



.heroRight img{

width:100%;

max-width:600px;

object-fit:contain;

}

`}</style>

<div className="home">

<div className="hero">

<div className="heroLeft">

<h4>

⚡ India's No.1 Electronics Store

</h4>

<h1>

ElectroHub

</h1>

<p>

Buy Arduino, ESP32, Raspberry Pi,
Sensors, Robotics Kits and Electronic Components
at the best prices with fast delivery.

</p>

<button
className="shopBtn"

onClick={()=>navigate("/products")}

>

🛒 Shop Now

</button>

</div>



</div>
{/* Search Bar */}

<div className="searchBar">

<input

type="text"

placeholder="🔍 Search Electronic Products..."

></input>

<button>

Search

</button>

</div>
<div className="featureGrid">

<div className="featureCard">

<div className="icon">

🚚

</div>

<h2>

Fast Delivery

</h2>

<p>

Quick Delivery Across India

</p>

</div>

<div className="featureCard">

<div className="icon">

⭐

</div>

<h2>

Premium Quality

</h2>

<p>

100% Genuine Electronic Components

</p>

</div>

<div className="featureCard">

<div className="icon">

🎓

</div>

<h2>

Student Friendly

</h2>

<p>

Affordable Prices For Students

</p>

</div>

<div className="featureCard">

<div className="icon">

💬

</div>

<h2>

24 × 7 Support

</h2>

<p>

Always Ready To Help

</p>

</div>

</div>
<div className="offerBanner">

<h1>

🔥 Flat 30% OFF On Electronics Kits 🔥

</h1>

<p>

Limited Time Offer • Free Delivery • Secure Payment

</p>

<button

onClick={()=>navigate("/products")}

>

Shop Deals

</button>

</div>
{/* Featured Products */}

<h1 className="sectionTitle">

🔥 Featured Products

</h1>

<div className="productGrid">

<div className="productCard">

<img
src="https://m.media-amazon.com/images/I/512Oa0A1edL._AC_UL480_FMwebp_QL65_.jpg"
alt=""
/>

<h3>Arduino Uno R3</h3>

<p>Best Selling Development Board</p>

<h2>₹599</h2>

<button
onClick={()=>navigate("/products")}
>

View Products

</button>

</div>

<div className="productCard">

<img
src="https://m.media-amazon.com/images/I/71NNESl1EEL._SL1500_.jpg"
alt=""
/>

<h3>ESP32 Board</h3>

<p>WiFi + Bluetooth Module</p>

<h2>₹799</h2>

<button
onClick={()=>navigate("/products")}
>

View Products

</button>

</div>

<div className="productCard">

<img
src="https://m.media-amazon.com/images/I/81x37vNZyVL._AC_UY327_FMwebp_QL65_.jpg"
alt=""
/>

<h3>Raspberry Pi</h3>

<p>Mini Computer Board</p>

<h2>₹4999</h2>

<button
onClick={()=>navigate("/products")}
>

View Products

</button>

</div>

</div>
<h1 className="sectionTitle">

📦 Shop By Category

</h1>

<div className="categoryGrid">

<div className="category">

🤖

<h3>Robotics</h3>

</div>

<div className="category">

⚡

<h3>Arduino</h3>

</div>

<div className="category">

📡

<h3>Sensors</h3>

</div>

<div className="category">

💻

<h3>Raspberry Pi</h3>

</div>

</div>
<h1 className="sectionTitle">

⭐ Happy Customers

</h1>

<div className="reviewGrid">

<div className="reviewCard">

⭐⭐⭐⭐⭐

<p>

Best Electronics Website.
Fast Delivery.

</p>

<h4>

- Arun

</h4>

</div>

<div className="reviewCard">

⭐⭐⭐⭐⭐

<p>

Excellent Quality Products.
Highly Recommended.

</p>

<h4>

- Gokul

</h4>

</div>

<div className="reviewCard">

⭐⭐⭐⭐⭐

<p>

Affordable Price For Students.

</p>

<h4>

- Kumar

</h4>

</div>

</div>
{/* Newsletter */}

<div className="newsletter">

<h1>

📧 Subscribe to ElectroHub

</h1>

<p>

Get the latest electronics offers, discounts and new product updates directly to your inbox.

</p>

<div className="newsletterBox">

<input

type="email"

placeholder="Enter your Email Address"

/>

<button>

Subscribe

</button>

</div>

</div>
<footer className="footer">

<div className="footerGrid">

<div>

<h2>

⚡ ElectroHub

</h2>

<p>

India's trusted Electronics Store.

Arduino • ESP32 • Raspberry Pi

Sensors • Robotics • DIY Kits

</p>

</div>

<div>

<h2>

Quick Links

</h2>

<p>🏠 Home</p>

<p>📦 Products</p>

<p>👤 Profile</p>

<p>📞 Contact</p>

</div>

<div>

<h2>

Categories

</h2>

<p>Arduino</p>

<p>ESP32</p>

<p>Sensors</p>

<p>Robotics</p>

</div>

<div>

<h2>

Contact

</h2>

<p>

📍 Coimbatore

</p>

<p>

📞 +91 7339294231

</p>

<p>

📧 rockingthamizha@gmail.com

</p>

</div>

</div>

<hr/>

<div className="copyright">

© 2026 ElectroHub | All Rights Reserved

</div>

</footer>

</div>
</>

);

}

export default Home;