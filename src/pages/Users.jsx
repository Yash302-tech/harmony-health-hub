import { useEffect, useState } from "react";
import { Search, Trash2, Eye, User, X } from "lucide-react";

import { db } from "../firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";


import DoctorSidebar from "../components/DoctorSidebar";
import Topbar from "../doctorDashboard/components/Topbar";
import StatusBadge from "../doctorDashboard/components/StatusBadge";

import "../test/doctordashboard.css";





const formatDate=(value)=>{


if(!value)
return "—";


if(value?.toDate){

return value.toDate()
.toLocaleDateString();

}


if(value?.seconds){

return new Date(
value.seconds*1000
)
.toLocaleDateString();

}



const d=new Date(value);


if(!isNaN(d.getTime())){

return d.toLocaleDateString();

}



return "—";


};








export default function Users(){



const [users,setUsers]=useState([]);

const [search,setSearch]=useState("");

const [loading,setLoading]=useState(true);

const [selectedUser,setSelectedUser]=useState(null);







// INLINE CSS

useEffect(()=>{


const style=document.createElement("style");


style.innerHTML=`



.user-modal-overlay{


position:fixed;

inset:0;

background:rgba(0,0,0,.45);

display:flex;

align-items:center;

justify-content:center;

z-index:999;

padding:20px;


}






.user-modal{


background:white;

width:850px;

max-width:95%;

height:82vh;

max-height:90vh;

border-radius:22px;

padding:25px;

display:flex;

flex-direction:column;

overflow:hidden;

box-shadow:

0 20px 50px rgba(0,0,0,.25);


}






.user-modal-header{


display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:20px;


}



.user-modal-header h2{


font-size:24px;

font-weight:800;

margin:0;

color:#1f2937;


}






.modal-close{


border:none;

background:#fee2e2;

color:#dc2626;

height:40px;

width:40px;

border-radius:50%;

cursor:pointer;

display:flex;

align-items:center;

justify-content:center;


}






.user-details{


display:grid;

grid-template-columns:repeat(2,1fr);

gap:15px;

background:#f7faf8;

padding:20px;

border-radius:18px;

margin-bottom:20px;

flex-shrink:0;


}







.user-details div{


background:white;

padding:14px;

border-radius:12px;

color:#6b7280;

border:1px solid #eee;


}



.user-details b{


display:block;

margin-top:5px;

color:#111827;


}







.history-box{


flex:1;

overflow-y:auto;

overflow-x:hidden;

padding-right:10px;


}







.history-card{


background:#fafafa;

padding:18px;

border-radius:16px;

margin-bottom:14px;

border:1px solid #e5e7eb;


}




.history-card h4{


margin:0 0 10px;

color:#2f7d5a;

font-size:17px;


}





.history-card p{


margin:7px 0;

font-size:14px;

color:#374151;


}






.history-box::-webkit-scrollbar{


width:6px;


}





.history-box::-webkit-scrollbar-thumb{


background:#2f7d5a;

border-radius:10px;


}






@media(max-width:700px){



.user-modal{


width:95%;

height:85vh;


}




.user-details{


grid-template-columns:1fr;


}




}
.users-table-scroll{


height:calc(100vh - 260px);


overflow-y:auto;


overflow-x:hidden;


}



.users-table-scroll::-webkit-scrollbar{


width:6px;


}



.users-table-scroll::-webkit-scrollbar-thumb{


background:#2f7d5a;


border-radius:10px;


}





.users-table-scroll table{


width:100%;


}



.users-table-scroll thead{


position:sticky;


top:0;


background:white;


z-index:5;


}



`;



document.head.appendChild(style);



return()=>{

document.head.removeChild(style);

}


},[]);









useEffect(()=>{


const fetchUsers=async()=>{


try{



const userSnap=

await getDocs(

collection(db,"users")

);





const consultationSnap=

await getDocs(

collection(db,"consultations")

);





const consultations =

consultationSnap.docs.map(doc=>({


id:doc.id,

...doc.data()


}));









const usersData =



userSnap.docs

.filter(doc=>{


const data=doc.data();


return data.role!=="admin";


})

.map(doc=>{



const data=doc.data();




const userConsultations =

consultations.filter(c=>{


return(

c.uid===doc.id ||

c.userId===doc.id ||

c.patientId===doc.id

)


});







return{


id:doc.id,


...data,



name:

data.name ||

data.fullName ||

"Unknown",



email:

data.email ||

"—",



phone:

data.phone ||

"—",



joinedAt:

formatDate(

data.createdAt ||

data.joinedAt ||

data.timestamp

),



status:

data.status ||

"active",



consultations:

userConsultations.length,



allConsultations:

userConsultations


}



});






setUsers(usersData);


}

catch(error){


console.log(error);


}

finally{


setLoading(false);


}


}



fetchUsers();



},[]);









const filteredUsers=

users.filter(u=>{


const text=

search.toLowerCase();



return(


u.name.toLowerCase()
.includes(text)



||

u.email.toLowerCase()
.includes(text)



||

u.phone.includes(search)


)


});









const deleteUser=async(id)=>{


if(!window.confirm("Delete this user?"))

return;



await deleteDoc(

doc(db,"users",id)

);



setUsers(prev=>

prev.filter(
u=>u.id!==id

)

);



};










return(



<div className="doctor-dashboard-layout">





<DoctorSidebar/>








<div className="doctor-dashboard-content">





<Topbar

title="Patients"

subtitle="Everyone registered on the patient app."

/>








<div className="app-content">






<div className="card">







<div className="search-bar">



<Search size={16}/>


<input


className="input"


placeholder="Search name, email or phone"


value={search}


onChange={(e)=>

setSearch(e.target.value)

}


/>


</div>









<div className="users-table-scroll">





{

loading ?


<div className="loading-block">

Loading users...

</div>





:

<table className="data-table">


<thead>

<tr>

<th>Patient</th>

<th>Phone</th>

<th>Consultations</th>

<th>Status</th>

<th>Action</th>


</tr>

</thead>





<tbody>




{

filteredUsers.map(u=>(


<tr key={u.id}>


<td>



<div className="row-person">


<div className="user-icon-box">


<User size={20}/>


</div>




<div>


<div className="name">


{u.name}


</div>


<div className="meta">

{u.email}

</div>


</div>



</div>


</td>






<td>

{u.phone}

</td>





<td>

{u.consultations}

</td>






<td>


<StatusBadge value={u.status}/>


</td>







<td>



<button

className="action-btn view"


onClick={()=>setSelectedUser(u)}


>


<Eye size={15}/>

Details


</button>







<button

className="action-btn delete"


onClick={()=>deleteUser(u.id)}


>


<Trash2 size={15}/>

Delete


</button>




</td>





</tr>



))


}



</tbody>



</table>



}



</div>







</div>









</div>







</div>







{

selectedUser &&



<div className="user-modal-overlay">





<div className="user-modal">






<div className="user-modal-header">



<h2>

{selectedUser.name}

</h2>




<button

className="modal-close"

onClick={()=>setSelectedUser(null)}

>

<X/>

</button>



</div>








<div className="user-details">



<div>

Email

<b>{selectedUser.email}</b>

</div>



<div>

Phone

<b>{selectedUser.phone}</b>

</div>



<div>

Joined

<b>{selectedUser.joinedAt}</b>

</div>



<div>

Total Consultations

<b>{selectedUser.allConsultations.length}</b>

</div>



</div>







<h3>

Previous Consultations

</h3>








<div className="history-box">





{

selectedUser.allConsultations.length===0 ?



<p>

No consultations found

</p>



:



selectedUser.allConsultations.map(c=>(



<div

className="history-card"

key={c.id}

>



<h4>

{

c.formData?.problem ||

c.problem ||

"Problem"

}


</h4>





<p>

Date:

{

formatDate(

c.createdAt ||

c.startedAt

)

}

</p>





<p>

Status:

{c.status || "pending"}

</p>




{

c.prescription &&

<p>

Prescription:

<br/>

{JSON.stringify(c.prescription)}

</p>


}



</div>



))


}




</div>








</div>







</div>



}





</div>



)

}