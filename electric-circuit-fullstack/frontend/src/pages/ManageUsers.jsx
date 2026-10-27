import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    warningPopup,
    confirmPopup
} from "../utils/Popup";

function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    // Logged-in user role
    const loggedRole = localStorage.getItem("role");

    useEffect(() => {

        if (loggedRole !== "SUPER_ADMIN") {

            warningPopup(
                "Access Denied",
                "Only Super Admin can manage users."
            );

            window.location.href = "/admin";
            return;

        }

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response = await API.get("/user/all");

            setUsers(response.data);

        } catch (error) {

            console.log(error);

            await errorPopup(
                "Failed",
                "Unable To Load Users"
            );

        }

    };

    const editUser = (user) => {

        if (user.role === "SUPER_ADMIN") {

            warningPopup(
                "Not Allowed",
                "Super Admin cannot be edited."
            );

            return;

        }

        setSelectedUser({

            ...user,
            password: ""

        });

    };

    const updateUser = async () => {

        try {

            await API.put(
                `/user/update/${selectedUser.id}`,
                selectedUser
            );

            // Change Role
            await API.put(
                `/user/change-role/${selectedUser.id}?role=${selectedUser.role}`
            );

            await successPopup(
                "Success",
                "User Updated Successfully"
            );

            setSelectedUser(null);

            loadUsers();

        } catch (error) {

            console.log(error);

            await errorPopup(
                "Failed",
                "Unable To Update User"
            );

        }

    };

    const deleteUser = async (id) => {

        const user = users.find(u => u.id === id);

        if (user && user.role === "SUPER_ADMIN") {

            warningPopup(
                "Not Allowed",
                "Super Admin cannot be deleted."
            );

            return;

        }

        const ok = await confirmPopup(
            "Delete User?",
            "This action cannot be undone."
        );

        if (!ok) return;

        try {

            await API.delete(`/user/${id}`);

            await successPopup(
                "Deleted",
                "User Deleted Successfully"
            );

            loadUsers();

        } catch (error) {

            console.log(error);

            await errorPopup(
                "Failed",
                "Unable To Delete User"
            );

        }

    };

    const filteredUsers = users.filter(user =>

        user.name.toLowerCase().includes(search.toLowerCase()) ||

        user.email.toLowerCase().includes(search.toLowerCase())

    );

    return (<>
<style>{`

body{
background: linear-gradient(160deg,#2b060b 0%,#170307 100%);
margin:0;
padding:0;
font-family:'Segoe UI',sans-serif;
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

.searchBox{
width:350px;
height:45px;
padding-left:15px;
font-size:16px;
border:none;
border-radius:10px;
margin-bottom:25px;
outline:none;
}

.table{
width:100%;
background:#fffaf3;
border-radius:15px;
overflow:hidden;
}

.table th{
background:#3a0d14;
color:white;
padding:15px;
text-align:center;
}

.table td{
padding:15px;
text-align:center;
vertical-align:middle;
}

.btn-sm{
width:90px;
height:38px;
border:none;
border-radius:8px;
font-weight:bold;
cursor:pointer;
margin:3px;
}

.editBtn{
background:#b8860b;
color:white;
}

.deleteBtn{
background:#dc3545;
color:white;
}

`}</style>

<div className="container-fluid">

<h1 className="title">
👑 Super Admin - Manage Users
</h1>

<input
className="searchBox"
type="text"
placeholder="Search User..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="table-responsive">

<table className="table table-bordered table-hover">

<thead>

<tr>

<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{

filteredUsers.map((user)=>(

<tr key={user.id}>

<td>{user.id}</td>

<td>{user.name}</td>

<td>{user.email}</td>

<td>

{

user.role==="SUPER_ADMIN"

?

<span
style={{
color:"gold",
fontWeight:"bold"
}}
>
👑 SUPER ADMIN
</span>

:

user.role==="ADMIN"

?

<span
style={{
color:"green",
fontWeight:"bold"
}}
>
🟢 ADMIN
</span>

:

<span
style={{
color:"gray",
fontWeight:"bold"
}}
>
👤 USER
</span>

}

</td>

<td>

{

user.role==="SUPER_ADMIN"

?

<button
className="btn-sm"
style={{
background:"#999",
color:"white",
cursor:"not-allowed"
}}
disabled
>
🔒 Locked
</button>

:

<>

<button
className="btn-sm editBtn"
onClick={()=>editUser(user)}
>
✏ Edit
</button>

<button
className="btn-sm deleteBtn"
onClick={()=>deleteUser(user.id)}
>
🗑 Delete
</button>

</>

}

</td>

</tr>

))

}

{

filteredUsers.length===0 &&

<tr>

<td
colSpan="5"
style={{
padding:"30px",
fontSize:"18px",
fontWeight:"bold",
color:"red"
}}
>

No Users Found

</td>

</tr>

}

</tbody>

</table>

</div>

<div
style={{
marginTop:"20px",
textAlign:"center"
}}
>

<h3
style={{
color:"white"
}}
>

Total Users : {filteredUsers.length}

</h3>

</div>
{selectedUser && (

<div
style={{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,.6)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:"9999"
}}
>

<div
style={{
width:"500px",
background:"#fffaf3",
padding:"30px",
borderRadius:"15px",
boxShadow:"0 10px 25px rgba(0,0,0,.35)"
}}
>

<h2
style={{
textAlign:"center",
marginBottom:"20px",
color:"#b8860b"
}}
>

✏ Edit User

</h2>

<input
className="form-control mb-3"
type="text"
placeholder="Name"
value={selectedUser.name}
onChange={(e)=>
setSelectedUser({
...selectedUser,
name:e.target.value
})
}
/>

<input
className="form-control mb-3"
type="email"
placeholder="Email"
value={selectedUser.email}
onChange={(e)=>
setSelectedUser({
...selectedUser,
email:e.target.value
})
}
/>

<select
className="form-control mb-3"
value={selectedUser.role}
onChange={(e)=>
setSelectedUser({
...selectedUser,
role:e.target.value
})
}
>

<option value="USER">
👤 USER
</option>

<option value="ADMIN">
🟢 ADMIN
</option>

</select>

<input
className="form-control mb-4"
type="password"
placeholder="New Password (Optional)"
value={selectedUser.password}
onChange={(e)=>
setSelectedUser({
...selectedUser,
password:e.target.value
})
}
/>

<div
style={{
display:"flex",
gap:"15px"
}}
>

<button
className="btn btn-success"
style={{
width:"100%",
height:"45px"
}}
onClick={updateUser}
>

💾 Save

</button>

<button
className="btn btn-danger"
style={{
width:"100%",
height:"45px"
}}
onClick={()=>{
setSelectedUser(null);
}}
>

❌ Cancel

</button>

</div>

</div>

</div>

)}

</div>

</>

);

}

export default ManageUsers;