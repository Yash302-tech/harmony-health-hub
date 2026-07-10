import { useEffect, useMemo, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  User, 

} from "lucide-react";

import DoctorSidebar from "../components/DoctorSidebar";

import Topbar from "../doctorDashboard/components/Topbar";
import Avatar from "../doctorDashboard/components/Avatar";
import Stars from "../doctorDashboard/components/Stars";


const FILTERS=[
"all",
1,
2,
3,
4,
5
];



const formatDate=(value)=>{


if(!value)
return "—";



if(value?.toDate){

return value
.toDate()
.toLocaleDateString();

}



if(value?.seconds){

return new Date(
value.seconds*1000
)
.toLocaleDateString();

}



return value;


};







export default function DoctorReviews(){



const [reviews,setReviews]=useState([]);

const [loading,setLoading]=useState(true);

const [filter,setFilter]=useState("all");






useEffect(()=>{


const fetchReviews=async()=>{


try{


const snap =
await getDocs(
collection(db,"reviews")
);



const data = snap.docs.map(doc=>{


const r=doc.data();



return{


id:doc.id,


userName:

r.userName ||

r.name ||

"Patient",



userPhoto:

r.userPhoto || "",




rating:

Number(r.rating)||0,




comment:

r.comment ||

"No review comment",




date:

formatDate(

r.createdAt ||

r.date

)


}



});





setReviews(data);



}

catch(error){

console.log(error);

}



finally{

setLoading(false);

}


}



fetchReviews();



},[]);









const filteredReviews = useMemo(()=>{


if(filter==="all")

return reviews;



return reviews.filter(

(r)=>

r.rating===Number(filter)

);



},[reviews,filter]);








const average = reviews.length

?

reviews.reduce(

(sum,r)=>

sum+r.rating,

0

)/reviews.length


:

0;










return(



<div className="doctor-dashboard-layout">







<DoctorSidebar />









<div className="doctor-dashboard-content">





<Topbar

title="Reviews"

subtitle={`${reviews.length} reviews from patients`}

/>









<div className="reviews-page-container">







<div className="review-stats">





<div className="review-stat-card">



<div className="review-number">

{average.toFixed(1)}

</div>



<div>

Average Rating

</div>




<div className="stars-horizontal">

<Stars value={average}/>

</div>



</div>









<div className="review-stat-card">



<div className="review-number">

{reviews.length}

</div>



<div>

Total Reviews

</div>



</div>







</div>









<div className="filter-buttons">



{

FILTERS.map((f)=>(


<button


key={f}


className={

filter===f

?

"review-filter active"

:

"review-filter"

}



onClick={()=>setFilter(f)}



>


{

f==="all"

?

"All"

:

`${f} ★`

}


</button>



))


}



</div>









<div className="reviews-box">





{


loading ?



<div className="empty-review">

Loading reviews...

</div>






:


filteredReviews.length===0 ?



<div className="empty-review">

No reviews found.

</div>







:


filteredReviews.map((r)=>(





<div

className="single-review"

key={r.id}

>





<div className="review-top">







<div className="review-user">






 <div className="user-icon-box">
  <User size={20}/></div>







<div>


<h3>

{r.userName}

</h3>





<div className="stars-horizontal">

<Stars value={r.rating}/>

</div>





</div>







</div>








<div className="review-date">

{r.date}

</div>






</div>








<p>

{r.comment}

</p>







</div>





))



}





</div>









</div>









</div>








</div>



)

}








// =========================
// PAGE ONLY CSS
// =========================


const style=document.createElement("style");


style.innerHTML=`



.reviews-page-container{


height:100%;

overflow:hidden;

padding:22px;


}







.review-stats{


display:grid;

grid-template-columns:repeat(2,1fr);

gap:20px;

margin-bottom:20px;


}






.review-stat-card{


background:white;

padding:20px;

border-radius:18px;

box-shadow:

0 8px 20px rgba(0,0,0,.06);


}







.review-number{


font-size:30px;

font-weight:800;

color:#2f7d5a;


}






.stars-horizontal{


display:flex !important;

flex-direction:row !important;

align-items:center;

gap:5px;

}






.stars-horizontal svg{


display:inline-block;

}








.filter-buttons{


display:flex;

gap:10px;

margin-bottom:15px;


}





.review-filter{


padding:9px 16px;

border-radius:12px;

border:1px solid #ddd;

background:white;

cursor:pointer;

font-weight:600;


}





.review-filter.active{


background:#2f7d5a;

color:white;

border-color:#2f7d5a;


}







.reviews-box{


height:calc(100vh - 330px);

overflow-y:auto;

padding-right:8px;

display:flex;

flex-direction:column;

gap:15px;


}







.single-review{


background:white;

border-radius:18px;

padding:18px;

box-shadow:

0 8px 20px rgba(0,0,0,.06);


}






.review-top{


display:flex;

justify-content:space-between;

align-items:flex-start;


}







.review-user{


display:flex;

gap:12px;

align-items:center;


}





.review-user h3{


margin:0;

font-size:17px;

font-weight:700;


}







.review-date{


font-size:13px;

color:#6b7280;


}






.single-review p{


margin-top:15px;

color:#374151;

line-height:1.5;


}






.empty-review{


background:white;

padding:30px;

border-radius:15px;

text-align:center;

color:#6b7280;


}





@media(max-width:768px){


.review-stats{

grid-template-columns:1fr;

}


}


`;

document.head.appendChild(style);