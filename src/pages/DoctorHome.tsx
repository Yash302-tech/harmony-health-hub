import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User as UsersIcon,
  Stethoscope,
  Hourglass,
  Star,
} from "lucide-react";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import DoctorSidebar from "../components/DoctorSidebar";

import Topbar from "../doctorDashboard/components/Topbar";
import StatCard from "../doctorDashboard/components/StatCard";
import StatusBadge from "../doctorDashboard/components/StatusBadge";

import "../test/doctordashboard.css";


type ConsultationItem = {

id:string;

name:string;

problem:string;

date:string;

status:string;

sortTime:number;

};



type ReviewItem = {

id:string;

name:string;

rating:number;

comment:string;

sortTime:number;

};





const getMillis = (value:any):number=>{


if(!value)
return 0;



if(typeof value==="number")
return value;



if(typeof value==="string"){

const t = new Date(value).getTime();

return Number.isNaN(t)?0:t;

}




if(typeof value?.toDate==="function"){

return value.toDate().getTime();

}




if(typeof value?.seconds==="number"){

return value.seconds*1000;

}




return 0;


};






const formatDateDisplay=(value:any)=>{


const ms=getMillis(value);


if(ms)

return new Date(ms)
.toLocaleDateString();



return "Date not available";


};







const renderStars=(rating:number)=>{


const rounded = Math.max(
0,
Math.min(5,Math.round(rating))
);



return(

<div className="rating-stars">


{

Array.from(
{length:5}
)
.map((_,i)=>(



<Star

key={i}

size={14}

fill={
i<rounded
?
"currentColor"
:
"none"
}

style={{

color:
i<rounded
?
"#f59e0b"
:
"#d1d5db"

}}


/>


))


}



</div>


);


};









const DoctorHome=()=>{


const navigate=useNavigate();




const [users,setUsers]=useState<any[]>([]);


const [allConsultations,setAllConsultations]=

useState<ConsultationItem[]>([]);



const [recentConsultations,setRecentConsultations]=

useState<ConsultationItem[]>([]);



const [reviews,setReviews]=useState<ReviewItem[]>([]);



const [loading,setLoading]=useState(true);









useEffect(()=>{



const loadDashboard=async()=>{



try{





// USERS


const userSnap =
await getDocs(
collection(db,"users")
);




const usersData =

userSnap.docs.map(doc=>{


const data:any = doc.data();



return{


id:doc.id,


...data,



name:

data.name ||

data.fullName ||

data.displayName ||

"Patient"


};


});








const userNameMap =
new Map<string,string>();




usersData.forEach((u)=>{


const key = u.uid || u.id;


userNameMap.set(

key,

u.name || "Patient"

);


});











// CONSULTATIONS



const consultationSnap =

await getDocs(

collection(db,"consultations")

);






const consultationData:

ConsultationItem[] =



consultationSnap.docs

.map(doc=>{



const data:any = doc.data();





const uid =


data.uid ||

data.userId ||

data.patientId ||

data.formData?.uid ||

data.formData?.userId ||

data.formData?.patientId ||

"";






const patientName =



data.formData?.name ||

data.patientName ||

data.name ||

userNameMap.get(uid) ||

"Patient";








const problem =



data.formData?.complaint ||

data.formData?.problem ||

data.formData?.symptoms ||

data.problem ||

"Problem not available";








const sortTime =


getMillis(data.createdAt) ||

getMillis(data.updatedAt) ||

getMillis(data.date);








return{


id:doc.id,


name:patientName,


problem,


date:

formatDateDisplay(

data.createdAt ||

data.updatedAt ||

data.date

),



status:

data.status ||

(data.doctorCompleted

?

"Completed"

:

"Pending"),



sortTime



};



})

.sort((a,b)=>

b.sortTime-a.sortTime

);











// REVIEWS


const reviewSnap =

await getDocs(

collection(db,"reviews")

);






const reviewData:

ReviewItem[] =



reviewSnap.docs

.map(doc=>{


const data:any = doc.data();



return{


id:doc.id,


name:

data.name ||

data.userName ||

"Patient",



rating:

Number(

data.rating ||

data.stars ||

0

),



comment:

data.comment ||

"No comment",




sortTime:

getMillis(data.createdAt) ||

getMillis(data.updatedAt) ||

getMillis(data.date)



};



})

.sort((a,b)=>

b.sortTime-a.sortTime

);









setUsers(usersData);



setAllConsultations(

consultationData

);



setRecentConsultations(

consultationData.slice(0,3)

);



setReviews(

reviewData.slice(0,5)

);






}

catch(error){


console.log(

"Dashboard Firebase Error:",

error

);



}



finally{


setLoading(false);


}





};





loadDashboard();



},[]);










const pending =

allConsultations.filter(

(c)=>

(c.status||"")

.toLowerCase()

==="pending"

).length;









const avgRating =

reviews.length

?

(

reviews.reduce(

(total,r)=>

total+

Number(r.rating||0),

0

)

/

reviews.length

)

.toFixed(1)


:

"0.0";









return(



<div className="doctor-dashboard-layout">





<DoctorSidebar />







<div className="doctor-dashboard-content">





<Topbar


title="Welcome back, Dr. Nandita"


subtitle="Here's what's happening with your patients today."


/>









<div className="app-content doctor-home-content">







<div className="stat-grid">






<StatCard

icon={UsersIcon}

value={
loading
?
"—"
:
users.length
}

label="Total patients"

/>








<StatCard

icon={Stethoscope}

value={
loading
?
"—"
:
allConsultations.length
}

label="Total consultations"

/>








<StatCard

icon={Hourglass}

value={
loading
?
"—"
:
pending
}

label="Pending consultations"

/>








<StatCard

icon={Star}

value={
loading
?
"—"
:
avgRating
}

label="Average rating"

/>





</div>









<div className="detail-grid doctor-dashboard-panels">







<div className="card dashboard-panel">





<div className="section-head">


<h2>

Recent consultations

</h2>





<span

className="link-quiet"

style={{cursor:"pointer"}}

onClick={()=>navigate("/dashboard/doctor/consultations")}

>


View all


</span>



</div>









<div className="consultation-list">





{

recentConsultations.length===0

?

<div className="empty-block">

No consultations yet.

</div>


:


recentConsultations.map(c=>(



<div

className="consultation-item"

key={c.id}

>



<div className="row-person">



<div className="user-icon-box">


<UsersIcon size={20}/>


</div>





<div>


<div className="name">

{c.name}

</div>



<div className="meta">

{c.date}

</div>




<div className="consultation-problem">


<span className="problem-label">

Problem:

</span>


{c.problem}


</div>



</div>



</div>





<StatusBadge value={c.status}/>



</div>



))



}




</div>






</div>









<div className="card dashboard-panel">





<div className="section-head">


<h2>

Recent reviews

</h2>



<span

className="link-quiet"

style={{cursor:"pointer"}}

onClick={()=>navigate("/dashboard/doctor/reviews")}

>


View all


</span>



</div>








<div className="review-list">





{

reviews.length===0

?

<div className="empty-block">

No reviews yet.

</div>


:


reviews.map(r=>(



<div

className="review-item"

key={r.id}

>



<div className="row-person">



<div className="user-icon-box">

<UsersIcon size={20}/>

</div>




<div>


<div className="name">

{r.name}

</div>



{renderStars(r.rating)}



</div>




</div>





<p className="review-comment">

{r.comment}

</p>




</div>



))



}




</div>








</div>









</div>







</div>







</div>







</div>



)


}



export default DoctorHome;