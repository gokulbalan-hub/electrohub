import { useEffect, useState } from "react";
import API from "../services/ApiService";
import {
    successPopup,
    errorPopup,
    confirmPopup
} from "../utils/Popup";

function ManageFeedback() {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {

        loadFeedback();

    }, []);

    const loadFeedback = async () => {

        try {

            const response = await API.get("/feedback/all");

            setFeedbacks(response.data);

        } catch (error) {

            console.log(error);

            await errorPopup(
                "Failed",
                "Unable To Load Feedback"
            );

        }

    };

    const deleteFeedback = async (id) => {

        const ok = await confirmPopup(
            "Delete Feedback?",
            "This action cannot be undone."
        );

        if (!ok) {
            return;
        }

        try {

            await API.delete(`/feedback/delete/${id}`);

            await successPopup(
                "Deleted",
                "Feedback Deleted Successfully"
            );

            loadFeedback();

        } catch (error) {

            console.log(error);

            await errorPopup(
                "Failed",
                "Unable To Delete Feedback"
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

.container-fluid{
margin-left:270px;
padding:30px;
width:calc(100% - 270px);
min-height:100vh;
}

.title{
text-align:center;
font-size:42px;
font-weight:bold;
color:#FFD700;
margin-bottom:35px;
text-shadow:2px 2px 8px rgba(0,0,0,.6);
}

.tableCard{
background:#fffaf3;
border-radius:18px;
overflow:hidden;
box-shadow:0 10px 25px rgba(0,0,0,.35);
}

.table{
margin-bottom:0;
}

.table th{
background:#3a0d14;
color:white;
text-align:center;
padding:18px;
font-size:16px;
vertical-align:middle;
}

.table td{
padding:18px;
text-align:center;
vertical-align:middle;
font-size:15px;
}

.idColumn{
width:70px;
}

.nameColumn{
min-width:150px;
}

.emailColumn{
min-width:220px;
}

.subjectColumn{
min-width:220px;
}

.messageColumn{
min-width:420px;
max-width:500px;
text-align:left;
word-break:break-word;
line-height:24px;
}

.dateColumn{
min-width:200px;
}

.deleteBtn{
width:110px;
height:40px;
border:none;
border-radius:8px;
background:#dc3545;
color:white;
font-weight:bold;
cursor:pointer;
transition:.3s;
}

.deleteBtn:hover{
background:#b9202c;
transform:translateY(-2px);
}

.noData{
padding:30px;
font-size:18px;
font-weight:bold;
color:red;
text-align:center;
}

.summary{
margin-top:25px;
display:flex;
justify-content:space-between;
align-items:center;
flex-wrap:wrap;
}

.totalCard{
background:#fffaf3;
padding:15px 25px;
border-radius:12px;
box-shadow:0 5px 15px rgba(60,5,10,.25);
}

.refreshBtn{
width:140px;
height:42px;
border:none;
border-radius:8px;
background:#3a0d14;
color:white;
font-weight:bold;
cursor:pointer;
transition:.3s;
}

.refreshBtn:hover{
background:#22050a;
}

`}</style>

<div className="container-fluid">

<h1 className="title">
💬 Customer Feedback
</h1>

<div className="tableCard">

<div className="table-responsive">

<table className="table table-bordered table-hover">

<thead>

<tr>

<th className="idColumn">ID</th>
<th className="nameColumn">Name</th>
<th className="emailColumn">Email</th>
<th className="subjectColumn">Subject</th>
<th className="messageColumn">Message</th>
<th className="dateColumn">Date & Time</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{

feedbacks.length > 0 ?

feedbacks.map((feedback)=>(

<tr key={feedback.id}>

<td>{feedback.id}</td>

<td>{feedback.name}</td>

<td className="emailColumn">
{feedback.email}
</td>

<td className="subjectColumn">
{feedback.subject}
</td>

<td className="messageColumn">
{feedback.message}
</td>

<td className="dateColumn">

{

feedback.createdAt

?

feedback.createdAt.replace("T"," ")

:

"No Date"

}

</td>

<td>

<button
className="deleteBtn"
onClick={()=>deleteFeedback(feedback.id)}
>

🗑 Delete

</button>

</td>

</tr>

))

:

<tr>

<td
colSpan="7"
className="noData"
>

No Feedback Available

</td>

</tr>

}

</tbody>

</table>

</div>

</div>
<div className="summary">

    <div className="totalCard">

        <h4
            style={{
                margin: 0,
                color: "#3a0d14"
            }}
        >

            💬 Total Feedback : {feedbacks.length}

        </h4>

    </div>

    <button
        className="refreshBtn"
        onClick={loadFeedback}
    >

        🔄 Refresh

    </button>

</div>

</div>

</>

    );

}

export default ManageFeedback;