import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/ApiService";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({});

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

    return (

<>
<style>{`

body{
background:#0f172a;
}

.container{

margin-left:270px;

padding:30px;

min-height:100vh;

width:calc(100% - 270px);

}
.card{
background:#f8f9fa;
padding:40px;
border-radius:20px;
display:flex;
gap:40px;
flex-wrap:wrap;
box-shadow:0 10px 30px rgba(0,0,0,.3);
}

.left{
flex:1;
text-align:center;
}

.left img{
width:100%;
max-width:450px;
height:400px;
object-fit:cover;
border-radius:15px;
}

.right{
flex:1;
}

.title{
font-size:38px;
font-weight:bold;
margin-bottom:20px;
}

.price{
font-size:30px;
color:green;
font-weight:bold;
margin:20px 0;
}

.info{
font-size:18px;
margin:10px 0;
}

.btn{
width:200px;
height:45px;
border:none;
border-radius:10px;
font-size:16px;
font-weight:bold;
cursor:pointer;
margin:10px;
}

.cartBtn{
color:#C1121F;
}

.backBtn{
background:#0d6efd;
color:white;
}

`}</style>

<div className="container">

<div className="card">

<div className="left">

<img

src={
product.image
? product.image
: "https://via.placeholder.com/450"
}

alt={product.name}

/>

</div>

<div className="right"><h1 className="title">

{product.name}

</h1>

<div className="info">

<b>🏷 Brand :</b> {product.brand}

</div>

<div className="info">

<b>📂 Category :</b> {product.category}

</div>

<div className="price">

₹ {product.price}

</div>

<div className="info">

<b>📦 Stock :</b>

{

product.stock > 0 ?

<span style={{color:"green"}}>

 In Stock ({product.stock})

</span>

:

<span style={{color:"red"}}>

 Out Of Stock

</span>

}

</div>

<div
style={{
marginTop:"20px",
fontSize:"17px",
lineHeight:"28px"
}}
>

<b>📝 Description</b>

<p
style={{
marginTop:"10px",
color:"#555"
}}
>

{

product.description
?

product.description

:

"No Description Available"

}

</p>

</div>

<div
style={{
marginTop:"35px"
}}
>

<button

className="btn cartBtn"

onClick={async()=>{

try{

const userId=localStorage.getItem("userId");

if(!userId){

warningPopup(
    "Login Required",
    "Please Login First"
);
navigate("/login");

return;

}

await API.post("/cart/add",{

userId:Number(userId),

productId:product.id,

quantity:1

});

warningPopup(
    "Login Required",
    "Please Login First"
);
}
catch(error){

console.log(error);

await errorPopup(
    "Error",
    "Unable To Add Product"
);
}

}}

>

🛒 Add To Cart

</button>

<button

className="btn backBtn"

onClick={()=>navigate("/products")}

>

⬅ Back

</button>

</div>

</div>

</div>

</div>

</>

);

}

export default ProductDetails;<div
style={{
fontSize:"24px",
color:"#ff9800",
marginTop:"15px",
marginBottom:"15px"
}}
>

⭐⭐⭐⭐⭐ (4.8 / 5)

</div>
