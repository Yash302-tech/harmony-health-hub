import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag, IndianRupee } from 'lucide-react'

import Topbar from '../doctorDashboard/components/Topbar'
import Avatar from '../doctorDashboard/components/Avatar'



export default function ConsultationDetail() {


  const navigate = useNavigate()



  const [notes,setNotes] = useState("")

  const [status,setStatus] = useState("pending")

  const [saved,setSaved] = useState(false)




  // Dummy UI data
  // Firebase will be connected later


  const consultation = {

    userName:"Demo Patient",

    userPhoto:"",

    date:"22 June 2026",

    mode:"online",

    amount:500,

    symptoms:"Fever, headache and body pain",

    prescription:"No prescription added"

  }




  function handleSave(){


    setSaved(true)


  }




return (

<>


<Topbar

title="Consultation details"

subtitle={consultation.date}

/>



<div className="app-content">



<a

className="back-link"

onClick={()=>navigate('/consultations')}

>

<ArrowLeft size={15}/>

Back to consultations


</a>






<div className="detail-grid">





{/* Profile Card */}


<div className="card profile-card">



<Avatar

name={consultation.userName}

photoURL={consultation.userPhoto}

size={84}

/>



<div

className="profile-name"

style={{marginTop:12}}

>

{consultation.userName}


</div>






<div className="kv-list">



<div className="kv-row">

<Calendar size={15}/>


<div>

<div className="kv-label">

Date

</div>


<div className="kv-value">

{consultation.date}

</div>


</div>


</div>







<div className="kv-row">


<Tag size={15}/>


<div>

<div className="kv-label">

Mode

</div>


<div className="kv-value">

{consultation.mode}

</div>


</div>


</div>







<div className="kv-row">


<IndianRupee size={15}/>


<div>


<div className="kv-label">

Fee

</div>



<div className="kv-value">

₹ {consultation.amount}

</div>



</div>



</div>





</div>




</div>









{/* Details Card */}



<div className="card">





<div className="section-head">

<h2>

Reported symptoms

</h2>

</div>




<p

style={{

fontSize:14,

lineHeight:1.6

}}

>


{consultation.symptoms}


</p>







<div

className="section-head"

style={{marginTop:22}}

>


<h2>

Prescription

</h2>


</div>



<p

style={{

fontSize:14,

lineHeight:1.6

}}

>


{consultation.prescription}


</p>








<div className="notes-box">


<label>

Status

</label>



<select

className="select"

value={status}

onChange={(e)=>setStatus(e.target.value)}

style={{maxWidth:220}}


>


<option value="pending">

Pending

</option>


<option value="completed">

Completed

</option>



<option value="cancelled">

Cancelled

</option>



</select>


</div>







<div className="notes-box">


<label>

Doctor's notes

</label>



<textarea


className="input"

rows={5}

placeholder="Add notes..."

value={notes}

onChange={(e)=>setNotes(e.target.value)}


/>



</div>







<div

style={{

marginTop:14,

display:"flex",

alignItems:"center",

gap:12

}}


>


<button

className="btn btn-primary"

onClick={handleSave}

>


Save changes


</button>




{

saved &&


<span

style={{

fontSize:13

}}

>

Saved ✓

</span>


}




</div>







</div>





</div>





</div>




</>


)

}