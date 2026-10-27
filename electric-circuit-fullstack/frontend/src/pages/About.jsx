import React from "react";

function About() {

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

padding:35px;

min-height:100vh;

}

.hero{

width:100vw;

height:100vh;

margin-left:calc(-50vw + 50%);

display:flex;

justify-content:center;

align-items:center;

padding:80px;

background-image:url("/images/about/about-bg.jpg");

background-size:cover;

background-position:center;

background-repeat:no-repeat;

position:relative;

overflow:hidden;

}
.hero::before{

content:"";

position:absolute;

top:0;

left:0;

width:100%;

height:100%;

background:rgba(0,0,0,.45);

}
.heroContent{

position:relative;

z-index:2;

display:flex;

align-items:center;

justify-content:space-between;

width:100%;

max-width:1200px;

color:white;

}
.heroLeft{

width:40%;

}

.heroLeft h1{

font-size:60px;

color:#FFD700;

line-height:75px;

}

.hero h1{

font-size:60px;

color:#FFD700;

margin-bottom:20px;

}

.hero p{

font-size:22px;

line-height:38px;

}
.heroRight{

width:55%;

}

.heroRight p{

font-size:24px;

line-height:40px;

color:white;

}

.sectionTitle{

text-align:center;

font-size:42px;

font-weight:bold;

color:#C1121F;

margin:60px 0 35px;

}

.cardGrid{

display:grid;
grid-template-columns:repeat(auto-fit,minmax(380px,1fr));

gap:40px;

gap:30px;

}

.card{

background:white;

padding:35px;

border-radius:20px;

box-shadow:0 10px 25px rgba(0,0,0,.12);

transition:.3s;

text-align:center;

}

.card:hover{

transform:translateY(-8px);

}

.card h2{

color:#C1121F;

margin-bottom:15px;

}

.card p{

line-height:30px;

color:#555;

}

.stats{

display:grid;

grid-template-columns:repeat(4,1fr);

gap:25px;

margin-top:40px;

}

.stat{

background:#FFD700;

padding:30px;

border-radius:18px;

text-align:center;

color:#111827;

font-weight:bold;

}

.stat h1{

font-size:42px;

margin-bottom:10px;

}

`}</style>
<div className="hero">

<div className="heroContent">

<div className="heroLeft">

<h1>

⚡ About ElectroHub

</h1>

</div>

<div className="heroRight">

<p>

ElectroHub is India's trusted electronics shopping platform for
Engineering Students, IoT Developers, Robotics Enthusiasts,
DIY Makers and Embedded Engineers.

We provide premium quality electronic components,
fast delivery and affordable prices.

</p>

</div>

</div>

</div> 
<div className="container">



{/* Why Choose Us */}

<h1 className="sectionTitle">

🌟 Why Choose ElectroHub?

</h1>

<div className="cardGrid">

<div className="card">

<h2>

🚚 Fast Delivery

</h2>

<p>

Quick shipping across India with secure packaging and live order tracking.

</p>

</div>

<div className="card">

<h2>

⭐ Premium Quality

</h2>

<p>

Every product is tested and verified before shipping.

</p>

</div>

<div className="card">

<h2>

🎓 Student Friendly

</h2>

<p>

Affordable pricing specially designed for students and project builders.

</p>

</div>

</div>

{/* Mission */}

<h1 className="sectionTitle">

🎯 Our Mission

</h1>

<div className="card">

<p>

Our mission is to provide genuine electronic components
at affordable prices while helping students, hobbyists,
researchers and engineers build innovative projects.

We believe quality electronics should be available to everyone.

</p>

</div>

{/* Vision */}

<h1 className="sectionTitle">

🚀 Our Vision

</h1>

<div className="card">

<p>

To become India's No.1 online electronics marketplace by
delivering high-quality products, excellent customer service
and innovative shopping experiences.

</p>

</div>

{/* Statistics */}

<h1 className="sectionTitle">

📊 Our Achievements

</h1>

<div className="stats">

<div className="stat">

<h1>5000+</h1>

<p>Happy Customers</p>

</div>

<div className="stat">

<h1>150+</h1>

<p>Products</p>

</div>

<div className="stat">

<h1>24×7</h1>

<p>Support</p>

</div>

<div className="stat">

<h1>100%</h1>

<p>Quality Check</p>

</div>

</div>
{/* Team Section */}

<h1 className="sectionTitle">

👨‍💻 Meet Our Team

</h1>

<div className="cardGrid">

<div className="card">

<h2>

👨‍💼 Founder

</h2>

<p>

Mr. Gokulbalan Ramamoorthi

</p>

<p>

Founder & Full Stack Developer of ElectroHub.

</p>

</div>

<div className="card">

<h2>

💬 Customer Support

</h2>

<p>

📧 rockingthamizha@gmail.com

</p>

<p>

Available 24 × 7 to solve customer queries.

</p>

</div>

<div className="card">

<h2>

🔍 Quality Assurance

</h2>

<p>

Every product is inspected before shipping to ensure the best customer experience.

</p>

</div>

</div>

{/* Company Details */}

<h1 className="sectionTitle">

🏢 Company Details

</h1>

<div
className="card"
style={{
textAlign:"left"
}}
>

<p><strong>Company :</strong> ElectroHub Electronics Pvt. Ltd.</p>

<p><strong>Location :</strong> Coimbatore, Tamil Nadu, India</p>

<p><strong>Email :</strong> rockingthamizha@gmail.com</p>

<p><strong>Phone :</strong> +91 7339294231</p>

<p><strong>Working Hours :</strong> Monday - Saturday (9:00 AM - 8:00 PM)</p>

</div>

{/* Footer */}

<footer
style={{
marginTop:"60px",
background:"#111827",
padding:"40px",
borderRadius:"20px",
textAlign:"center",
color:"white"
}}
>

<h2
style={{
color:"#FFD700",
marginBottom:"20px"
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

export default About;