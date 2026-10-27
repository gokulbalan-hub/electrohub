import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function Admin() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

       const role = localStorage.getItem("role");

if(role!=="ADMIN" && role!=="SUPER_ADMIN"){

warningPopup(

"Access Denied",

"Unauthorized Access"

);

navigate("/");

return;

}

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

    const deleteProduct = async (id) => {

        const ok = await confirmPopup(
            "Delete Product?",
            "This action cannot be undone."
        );

        if (!ok) return;

        try {

            await API.delete(`/product/${id}`);

           await successPopup(
    "Deleted 🗑",
    "Product Deleted Successfully"
);
            loadProducts();

        } catch (error) {

            console.log(error);

            await errorPopup(
                "Delete Failed",
                "Unable To Delete Product"
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
font-family:'Segoe UI',sans-serif;
}

body{
background:linear-gradient(160deg,#2b060b 0%,#170307 100%);
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

.topBar{
display:flex;
justify-content:space-between;
align-items:center;
gap:20px;
flex-wrap:wrap;
margin-bottom:30px;
}

.searchBox{
width:350px;
height:45px;
padding:0 15px;
border:none;
border-radius:10px;
font-size:16px;
outline:none;
box-shadow:0 4px 12px rgba(0,0,0,.2);
}

.actionButtons{
display:flex;
gap:12px;
flex-wrap:wrap;
justify-content:flex-end;
align-items:center;
}

.topBtn{
width:140px;
height:45px;
border:none;
border-radius:8px;
font-size:14px;
font-weight:bold;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
transition:.3s;
box-shadow:0 5px 12px rgba(0,0,0,.25);
}

.topBtn:hover{
transform:translateY(-2px);
}

.tableCard{
background:#fffaf3;
border-radius:15px;
overflow:hidden;
box-shadow:0 8px 20px rgba(60,5,10,.25);
}

.table{
margin-bottom:0;
}

.table th{
background:#3a0d14;
color:white;
text-align:center;
padding:15px;
font-size:16px;
}

.table td{
text-align:center;
vertical-align:middle;
padding:12px;
font-size:15px;
}

.productImg{
width:60px;
height:60px;
border-radius:10px;
object-fit:cover;
}

.actionBtn{
width:80px;
height:36px;
border:none;
border-radius:6px;
font-size:13px;
font-weight:bold;
cursor:pointer;
margin:2px;
}

.editBtn{
background:#FFD54F;
color:#222;
}

.deleteBtn{
background:#E53935;
color:white;
}
`}</style>

<div className="container-fluid">

<h1 className="title">
⚙ ElectroHub Admin Dashboard
</h1>

<div className="topBar">

<input
className="searchBox"
type="text"
placeholder="🔍 Search Product..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="actionButtons">

<button
className="topBtn btn btn-success"
onClick={()=>navigate("/admin/add-product")}
>
➕ Add
</button>


{localStorage.getItem("role") === "SUPER_ADMIN" && (

<button
className="topBtn btn btn-info"
onClick={()=>navigate("/admin/users")}
>

👥 Users

</button>

)}

<button
className="topBtn btn btn-warning"
onClick={()=>navigate("/manage-feedback")}
>
💬 Feedback
</button>

<button
className="topBtn btn btn-primary"
onClick={()=>navigate("/manage-orders")}
>
📦 Orders
</button>

</div>

</div>

<div className="tableCard">

<div className="table-responsive">

<table className="table table-bordered table-hover">

<thead>

<tr>

<th>ID</th>
<th>Image</th>
<th>Name</th>
<th>Category</th>
<th>Price</th>
<th>Stock</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{filteredProducts.map((product)=>(

<tr key={product.id}>

<td>{product.id}</td>

<td>
<img
className="productImg"
src={
product.image && product.image.trim() !== ""
? product.image
: "https://via.placeholder.com/60"
}
alt={product.name}
/>
</td>

<td>{product.name}</td>

<td>{product.category}</td>

<td>₹ {product.price}</td>

<td>

{
product.stock>10 ?

<span style={{color:"green",fontWeight:"bold"}}>
✅ In Stock ({product.stock})
</span>

:

product.stock>0 ?

<span style={{color:"orange",fontWeight:"bold"}}>
⚠ Low Stock ({product.stock})
</span>

:

<span style={{color:"red",fontWeight:"bold"}}>
❌ Out Of Stock
</span>

}

</td>

<td>

<button
className="actionBtn editBtn"
onClick={()=>navigate(`/admin/edit-product/${product.id}`)}
>
✏ Edit
</button>

<button
className="actionBtn deleteBtn"
onClick={()=>deleteProduct(product.id)}
>
🗑 Delete
</button>

</td>

</tr>

))}

{filteredProducts.length===0&&(

<tr>

<td colSpan="7">

No Products Found

</td>

</tr>

)}

</tbody>

</table>

</div>

</div>
<div className="summary">

    <div
        style={{
            background: "#fffaf3",
            padding: "15px 25px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(60,5,10,.2)"
        }}
    >

        <h4
            style={{
                margin: 0,
                color: "#3a0d14"
            }}
        >
            📦 Total Products : {filteredProducts.length}
        </h4>

    </div>

    <div
        style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
        }}
    >

        <button
            className="topBtn btn btn-secondary"
            onClick={loadProducts}
        >
            🔄 Refresh
        </button>

        <button
            className="topBtn btn btn-danger"
            onClick={async () => {

    const ok = await confirmPopup(
        "Logout?",
        "Are you sure you want to logout?"
    );

    if (!ok) return;

    localStorage.clear();

    await successPopup(
        "Logged Out",
        "See you again!"
    );

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

export default Admin;