import React, { useState } from "react";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function Contact() {

    const [form, setForm] = useState({

        name: "",
        email: "",
        subject: "",
        message: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const sendMessage = async (e) => {

        e.preventDefault();

        try {

            await API.post("/feedback/save", form);

await successPopup(
    "Thank You ❤️",
    "Feedback Sent Successfully"
);
            setForm({

                name: "",
                email: "",
                subject: "",
                message: ""

            });

        } catch (error) {

            console.log(error);

await errorPopup(
    "Failed",
    "Unable to Send Feedback."
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
background:linear-gradient(160deg,#2b060b 0%,#170307 100%);
}

.contact{

padding:50px;
color:white;

}

.hero{

width:100vw;
height:100vh;
margin-left:calc(-50vw + 50%);
display:flex;
justify-content:center;
align-items:center;
padding:80px;
background-image:url("/images/contact/contact-bg.jpg");
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
text-align:center;
max-width:900px;
padding:20px;

}

.heroContent h1{

font-size:65px;
color:#FFD700;
margin-bottom:20px;

}

.heroContent p{

font-size:24px;
color:white;
line-height:40px;

}

.container{

margin-left:270px;
padding:30px;
min-height:100vh;
width:calc(100% - 270px);

}

.info{

background:#3a0d14;
padding:35px;
border-radius:20px;
margin-bottom:40px;

}

.info h2{

color:#FFD700;
margin-bottom:20px;

}

.info p{

font-size:18px;
margin:18px 0;

}

.form{

background:#fffaf3;
padding:35px;
border-radius:20px;

}

.form h2{

color:#c1121f;
margin-bottom:20px;

}

.form input,
.form textarea{

width:100%;
padding:15px;
margin-bottom:20px;
border:1px solid #ccc;
border-radius:10px;
font-size:16px;
outline:none;

}

.form input:focus,
.form textarea:focus{

border:2px solid #b8860b;

}

.form textarea{

height:150px;
resize:none;

}

.sendBtn{

width:250px;
height:50px;
background:#b8860b;
color:white;
border:none;
border-radius:10px;
font-size:17px;
font-weight:bold;
cursor:pointer;
transition:.3s;

}

.sendBtn:hover{

background:#8a6d1f;
transform:scale(1.05);

}

`}</style>
<div className="contact">

    <div className="hero">

        <div className="heroContent">

            <h1>
                📞 Contact ElectroHub
            </h1>

            <p>
                Have questions about our products or your order?
                <br /><br />
                Our support team is always ready to help you with
                product details, technical support, order tracking,
                bulk purchase enquiries and customer service.
            </p>

        </div>

    </div>

    <div className="container">

        <div className="info">

            <h2>
                Contact Information
            </h2>

            <p>
                📍 Coimbatore, Tamil Nadu, India
            </p>

            <p>
                📞 +91 7339294231
            </p>

            <p>
                📧 support@electrohub.com
            </p>

            <p>
                🌐 https://www.electrohub.com
            </p>

            <p>
                🕘 Monday - Saturday
                <br />
                9:00 AM - 8:00 PM
            </p>

        </div>

        <div className="form">

            <h2>
                Send Your Feedback
            </h2>

            <form onSubmit={sendMessage}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="subject"
                    placeholder="Enter Subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                />
                                <textarea
                    name="message"
                    placeholder="Type your message..."
                    value={form.message}
                    onChange={handleChange}
                    required
                ></textarea>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px"
                    }}
                >

                    <button
                        type="submit"
                        className="sendBtn"
                    >
                        📩 Send Feedback
                    </button>

                </div>

            </form>

        </div>

    </div>

    <div
        style={{
            marginTop: "50px",
            background: "linear-gradient(135deg,#C1121F,#7A0912)",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center"
        }}
    >

        <h2
            style={{
                color: "#FFD700",
                marginBottom: "20px"
            }}
        >
            📍 Our Location
        </h2>

        <p
            style={{
                fontSize: "18px",
                marginBottom: "20px",
                color: "white"
            }}
        >
            ElectroHub Electronics Pvt. Ltd.
            <br />
            Coimbatore,
            Tamil Nadu - 641001
            <br />
            India
        </p>
                <iframe
            title="ElectroHub Location"
            src="https://www.google.com/maps?q=Coimbatore,Tamil%20Nadu&output=embed"
            width="100%"
            height="350"
            style={{
                border: "0",
                borderRadius: "15px"
            }}
            loading="lazy"
            allowFullScreen
        ></iframe>

    </div>

    <div
        style={{
            marginTop: "40px",
            padding: "20px",
            textAlign: "center",
            color: "#ccc",
            fontSize: "16px"
        }}
    >

        © 2026 ElectroHub | All Rights Reserved

    </div>

</div>

</>

    );

}

export default Contact;