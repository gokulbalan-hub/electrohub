import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function AddProduct() {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        category: "",
        brand: "",
        price: "",
        stock: "",
        image: "",
        description: ""
    });

    const saveProduct = async () => {

        try {

            await API.post("/product/add", product);

await successPopup(
    "Added ✅",
    "Product Added Successfully"
);
            navigate("/admin");

        } catch (error) {

            console.log(error);

await errorPopup(
    "Failed",
    "Unable To Add Product"
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

.container-fluid{

margin-left:270px;

padding:30px;

width:calc(100% - 270px);

}

.card{

width:100%;

max-width:1200px;

margin:auto;

background:#fffaf3;

padding:50px;

border-radius:20px;

box-shadow:0 10px 30px rgba(60,5,10,.35);

}

.title{

text-align:center;
font-size:45px;
color:#ffd700;
margin-bottom:30px;

}

.preview{

text-align:center;
margin-bottom:30px;

}

.preview img{

width:350px;

height:260px;

object-fit:cover;

border-radius:15px;

border:2px solid #ddd;

}

.row{

display:grid;

grid-template-columns:1fr 1fr;

gap:25px;

margin-bottom:25px;

}

.formGroup{

width:100%;

display:flex;

flex-direction:column;

}

.formGroup label{

font-size:17px;
font-weight:bold;
margin-bottom:8px;

}

.input{

width:100%;

height:55px;

padding:15px;

font-size:17px;

border:1px solid #ccc;

border-radius:10px;

}

.input:focus{

border-color:#c1121f;
outline:none;
box-shadow:0 0 8px rgba(193,18,31,.25);

}

.textArea{

width:100%;

height:180px;

padding:15px;

font-size:17px;

border:1px solid #ccc;

border-radius:10px;

resize:none;

}

.buttonArea{

display:flex;
justify-content:center;
gap:20px;
margin-top:30px;
flex-wrap:wrap;

}

.btn{

width:180px;
height:45px;
border:none;
border-radius:10px;
font-size:15px;
font-weight:bold;
cursor:pointer;

}

.addBtn{

background:#b8860b;
color:white;

}

.backBtn{

background: linear-gradient(135deg, #ffe066 0%, #d4af37 100%); box-shadow:0 4px 15px rgba(212,175,55,.35);

}

`}</style>

<div className="container-fluid">

<h1 className="title">

➕ Add New Product

</h1>

<div className="card">

<div className="preview">

<img
src={
product.image
? product.image
: "https://via.placeholder.com/280x220?text=Product+Preview"
}
alt="Preview"
/>

</div><div className="row">

<div className="formGroup">

<label>

📦 Product Name

</label>

<input
className="input"
type="text"
placeholder="Enter Product Name"
value={product.name}
onChange={(e)=>
setProduct({
...product,
name:e.target.value
})
}
/>

</div>

<div className="formGroup">

<label>

📂 Category

</label>

<input
className="input"
type="text"
placeholder="Enter Category"
value={product.category}
onChange={(e)=>
setProduct({
...product,
category:e.target.value
})
}
/>

</div>

</div>

<div className="row">

<div className="formGroup">

<label>

🏷 Brand

</label>

<input
className="input"
type="text"
placeholder="Enter Brand Name"
value={product.brand}
onChange={(e)=>
setProduct({
...product,
brand:e.target.value
})
}
/>

</div>

<div className="formGroup">

<label>

💰 Product Price (₹)

</label>

<input
className="input"
type="number"
placeholder="Enter Product Price"
value={product.price}
onChange={(e)=>
setProduct({
...product,
price:e.target.value
})
}
/>

</div>

</div><div className="row">

<div className="formGroup">

<label>

📦 Stock Quantity

</label>

<input
className="input"
type="number"
placeholder="Enter Available Stock"
value={product.stock}
onChange={(e)=>
setProduct({
...product,
stock:e.target.value
})
}
/>

</div>

<div className="formGroup">

<label>

🖼 Product Image URL

</label>

<input
className="input"
type="text"
placeholder="Paste Product Image URL"
value={product.image}
onChange={(e)=>
setProduct({
...product,
image:e.target.value
})
}
/>

</div>

</div>

<div
style={{
marginTop:"25px",
marginBottom:"25px",
textAlign:"center"
}}
>

<h4
style={{
marginBottom:"15px",
color:"#c1121f"
}}
>

👀 Live Product Preview

</h4>

<img
src={
product.image && product.image.trim() !== ""
? product.image
: "https://via.placeholder.com/300x220?text=No+Image"
}
alt="Preview"
style={{
width:"300px",
height:"220px",
objectFit:"cover",
borderRadius:"15px",
border:"2px solid #ddd",
boxShadow:"0 8px 20px rgba(60,5,10,.25)"
}}
/>

</div>

<div className="formGroup">

<label>

📝 Product Description

</label>

<textarea
className="textArea"
placeholder="Enter Product Description"
value={product.description}
onChange={(e)=>
setProduct({
...product,
description:e.target.value
})
}
/>

</div><div className="buttonArea">

<button
className="btn addBtn"
onClick={saveProduct}
>

➕ Add Product

</button>

<button
className="btn backBtn"
onClick={() => navigate("/admin")}
>

⬅ Back To Admin

</button>

<button
className="btn"
style={{
background:"#c1121f",
color:"white"
}}
onClick={() => {

setProduct({

name:"",
category:"",
brand:"",
price:"",
stock:"",
image:"",
description:""

});

}}
>

🧹 Clear

</button>

</div>

</div>

</div>

</>

);

}

export default AddProduct;