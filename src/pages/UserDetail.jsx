import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Cake } from 'lucide-react'

import Topbar from '../doctorDashboard/components/Topbar'
import Avatar from '../doctorDashboard/components/Avatar'
import StatusBadge from '../doctorDashboard/components/StatusBadge'



export default function UserDetail() {


  const navigate = useNavigate()



  // Dummy UI data
  // Firebase will be connected later


  const user = {


    name:"Demo Patient",

    email:"patient@gmail.com",

    phone:"9876543210",

    location:"India",

    age:"25",

    gender:"Male",

    joinedAt:"22 June 2026"

  }





  const consultations = []

  const consultLoading = false





return (

<>


<Topbar

title={user.name || "Patient profile"}

subtitle={user.email}

/>






<div className="app-content">





<a

className="back-link"

onClick={()=>navigate('/users')}

>


<ArrowLeft size={15}/>


Back to users


</a>








<div className="detail-grid">





{/* Profile Card */}


<div className="card profile-card">





<Avatar

name={user.name}

size={84}

/>





<div

className="profile-name"

style={{marginTop:12}}

>


{user.name}


</div>





<div style={{marginTop:6}}>


<StatusBadge value="active"/>


</div>








<div className="kv-list">





<div className="kv-row">


<Mail size={15}/>



<div>


<div className="kv-label">

Email

</div>


<div className="kv-value">

{user.email}

</div>



</div>


</div>









<div className="kv-row">


<Phone size={15}/>


<div>


<div className="kv-label">

Phone

</div>


<div className="kv-value">

{user.phone}

</div>



</div>


</div>








<div className="kv-row">


<MapPin size={15}/>



<div>


<div className="kv-label">

Location

</div>



<div className="kv-value">

{user.location}

</div>



</div>


</div>








<div className="kv-row">


<Cake size={15}/>



<div>


<div className="kv-label">

Age / Gender

</div>



<div className="kv-value">

{user.age}, {user.gender}

</div>



</div>


</div>








<div className="kv-row">


<Calendar size={15}/>



<div>


<div className="kv-label">

Joined

</div>


<div className="kv-value">

{user.joinedAt}

</div>



</div>


</div>






</div>






</div>










{/* Consultation History */}



<div className="card">





<div className="section-head">


<h2>

Consultation history

</h2>


</div>







{

consultLoading ?



<div className="loading-block">

Loading consultations…

</div>





:



consultations.length===0 ?



<div className="empty-block">


This patient hasn't had a consultation yet.


</div>





:



<div className="table-wrap">



<table className="data-table">



<thead>


<tr>

<th>Date</th>

<th>Mode</th>

<th>Symptoms</th>

<th>Status</th>

</tr>


</thead>




<tbody>


{

consultations.map((c)=>(



<tr key={c.id}>


<td>{c.date}</td>


<td>{c.mode}</td>


<td>{c.symptoms}</td>


<td>

<StatusBadge value={c.status}/>

</td>



</tr>



))


}




</tbody>



</table>




</div>





}





</div>






</div>






</div>




</>


)

}