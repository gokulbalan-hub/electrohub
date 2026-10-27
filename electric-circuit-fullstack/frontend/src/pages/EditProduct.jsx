import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function EditProduct() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: "",
        category: "",
        brand: "",
        price: "",
        stock: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {

        try {

            const response = await API.get(`/product/${id}`);

            setProduct(response.data);

        } catch (error) {

            console.log(error);

errorPopup(
    "Failed",
    "Unable To Load Product"
);
        }

    };

    const updateProduct = async () => {

        try {

            await API.put(`/product/update/${id}`, product);

await successPopup(
    "Updated ✨",
    "Product Updated Successfully"
);
            navigate("/admin");

        } catch (error) {

            console.log(error);

await errorPopup(
    "Failed",
    "Product Update Failed"
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

width:100%;
max-width:1700px;
margin:auto;
padding:40px 80px;

}

.card{

width:100%;
max-width:1450px;
margin:auto;
background:#fffaf3;
padding:50px;
border-radius:20px;
box-shadow:0 10px 30px rgba(60,5,10,.35);

}

.title{

text-align:center;
font-size:45px;
font-weight:bold;
color:#ffd700;
margin-bottom:35px;

}

.mainGrid{

display:grid;
grid-template-columns:420px 1fr;
gap:40px;
align-items:start;

}

.preview{

text-align:center;

}

.preview img{

width:380px;
height:300px;
border-radius:15px;
border:2px solid #ddd;
object-fit:cover;
box-shadow:0 8px 20px rgba(60,5,10,.25);

}

.form{

width:100%;

}

.row{

display:grid;
grid-template-columns:1fr 1fr;
gap:25px;
margin-bottom:25px;

}

.formGroup{

display:flex;
flex-direction:column;

}

.formGroup label{

font-size:17px;
font-weight:bold;
margin-bottom:8px;
color:#333;

}

.input{

width:100%;
height:55px;
padding:15px;
font-size:17px;
border:1px solid #ccc;
border-radius:10px;
outline:none;

}

.input:focus{

border-color:#c1121f;
box-shadow:0 0 8px rgba(193,18,31,.25);

}

.textArea{

width:100%;
height:220px;
padding:15px;
font-size:17px;
border:1px solid #ccc;
border-radius:10px;
resize:none;
outline:none;

}

.textArea:focus{

border-color:#c1121f;
box-shadow:0 0 8px rgba(193,18,31,.25);

}

.buttonArea{

display:flex;
justify-content:center;
gap:20px;
margin-top:35px;
flex-wrap:wrap;

}

.btn{

width:220px;
height:50px;
border:none;
border-radius:10px;
font-size:17px;
font-weight:bold;
cursor:pointer;

}

.saveBtn{

background:#b8860b;
color:white;

}

.backBtn{

background: linear-gradient(135deg, #ffe066 0%, #d4af37 100%); box-shadow:0 4px 15px rgba(212,175,55,.35);

}

`}</style>

<div className="container-fluid">

<h1 className="title">

✏ Edit Product

</h1>

<div className="card">

<div className="mainGrid">

<div className="preview">

<img

src={
product.image && product.image.trim() !== ""
? product.image
: "https://via.placeholder.com/380x300?text=Product+Preview"
}

alt="Preview"

/>

</div>

<div className="form">
    <div className="row">

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
placeholder="Enter Brand"
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
placeholder="Enter Price"
value={product.price}
onChange={(e)=>
setProduct({
...product,
price:e.target.value
})
}
/>

</div>

</div>

<div className="row">

<div className="formGroup">

<label>

📦 Stock Quantity

</label>

<input
className="input"
type="number"
placeholder="Enter Stock"
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
placeholder="Paste Image URL"
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

</div>

<div
style={{
marginTop:"30px",
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
: "https://via.placeholder.com/380x300?text=No+Image"
}
alt="Product Preview"
style={{
width:"380px",
height:"300px",
objectFit:"cover",
borderRadius:"15px",
border:"2px solid #ddd",
boxShadow:"0 8px 20px rgba(60,5,10,.25)"
}}
/>

</div>

<div className="buttonArea">

<button
className="btn saveBtn"
onClick={updateProduct}
>

💾 Save Changes

</button>

<button
className="btn backBtn"
onClick={() => navigate("/admin")}
>

⬅ Back To Admin

</button>

</div>

</div>

</div>

</div>

</div>

</> 

);

}

export default EditProduct;