import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/firebase";
import img from "./ChatGPT Image Jul 11, 2026, 02_28_41 PM.png"

import {
  collection,
  query,
  onSnapshot,
  DocumentData
} from "firebase/firestore";

import html2pdf from "html2pdf.js";



const Prescription = () => {


const [prescriptions,setPrescriptions] =
useState<DocumentData[]>([]);


const [selected,setSelected] =
useState<DocumentData | null>(null);





useEffect(()=>{


const unsubscribeAuth =
auth.onAuthStateChanged((user)=>{



if(!user)
return;





const q=query(
collection(db,"consultations")
);






const unsubscribeData =
onSnapshot(q,(snapshot)=>{



const data:DocumentData[] =

snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));






const completed = data.filter(
(item:DocumentData)=>{


return(

item.userId === user.uid &&

item.doctorCompleted === true

);


}

);





setPrescriptions(completed);



});





return ()=>unsubscribeData();



});





return ()=>unsubscribeAuth();



},[]);









const downloadPDF = () => {


const element = document.getElementById(
"prescription-content"
);



if(!element)
return;





html2pdf()

.set({

margin:[15,15,25,15],


filename:"doctor-prescription.pdf",



html2canvas:{


scale:2,


scrollY:0


},




jsPDF:{


unit:"mm",


format:"a4",


orientation:"portrait"


}



})

.from(element)

.save();



};







return(



<DashboardLayout>



<div className="space-y-6 animate-fade-in">







<div>


<h1 className="text-3xl font-display font-bold">

My Prescriptions

</h1>



<p className="text-muted-foreground">

Doctor generated prescriptions

</p>



</div>









{

prescriptions.length===0 ?



<p>

No prescriptions available

</p>





:



<div className="space-y-4">





{

prescriptions.map((item,index)=>(



<div

key={item.id}

onClick={()=>setSelected(item)}

className="bg-card border p-5 rounded-xl cursor-pointer hover:shadow-md transition"


>



<h3 className="font-bold">

Prescription #{index+1}

</h3>




<p className="text-sm">

Problem:

{

item.problem ||

item.formData?.problem ||

"N/A"

}

</p>



<p className="text-green-600 text-sm">

✔ Reviewed by Doctor

</p>




</div>



))


}



</div>



}













{

selected &&



<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999999] p-5 pt-[250px]">





<div className="bg-white w-[850px] max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden mt-10">






<div className="overflow-y-auto max-h-[70vh] p-8">






<h1 className="text-2xl font-bold text-green-700 text-center mb-6">

Prescription

</h1>








<div id="prescription-content"
className="pb-10"
>







<div className="text-center border-b pb-5">


<h1 className="text-3xl font-bold text-green-700">

Dr. Nandita Karmakar

</h1>


<p>

BHMS, MD (Homeopathy)

</p>


<p className="text-sm text-gray-500">

Harmony Health Clinic

</p>



</div>









<div className="mt-6 bg-green-50 rounded-2xl p-5">


<h2 className="font-bold text-lg">

Patient Information

</h2>





<div className="grid grid-cols-2 gap-3 text-sm mt-3">


<p>

<b>Age:</b>

{selected.formData?.age || "-"}

</p>



<p>

<b>Gender:</b>

{selected.formData?.gender || "-"}

</p>




<p>

<b>Weight:</b>

{selected.formData?.weight || "-"}

</p>




<p>

<b>Date:</b>

{

selected.startedAt?.seconds

?

new Date(
selected.startedAt.seconds*1000
)
.toLocaleDateString()

:

"N/A"

}

</p>




</div>



</div>









<div className="mt-6">


<h2 className="font-bold text-xl text-green-700">

Consultation Details

</h2>






<div className="bg-gray-50 p-5 rounded-xl mt-3 space-y-2 text-sm">



<p>

<b>Problem:</b>

{

selected.problem ||

selected.formData?.problem ||

"N/A"

}

</p>




<p>

<b>Complaint:</b>

{

selected.formData?.complaint ||

"N/A"

}

</p>




<p>

<b>Duration:</b>

{

selected.formData?.duration ||

"N/A"

}

</p>




<p>

<b>Severity:</b>

{

selected.formData?.severity ||

"N/A"

}

</p>




</div>




</div>









<div className="mt-6">


<h2 className="font-bold text-xl text-green-700">

Medical History

</h2>





<p className="mt-3 text-sm">

Past Illness:

{selected.formData?.pastIllness || "-"}

</p>




<p className="text-sm">

Medications:

{selected.formData?.medications || "-"}

</p>





<p className="text-sm">

Family History:

{selected.formData?.familyHistory || "-"}

</p>



</div>








<div className="mt-6">
  <h2 className="font-bold text-xl text-green-700">
    Doctor Prescription
  </h2>

  <div className="bg-green-50 border rounded-2xl p-5 mt-3 space-y-3">

    <p>
      <b>Number of Medicines:</b>{" "}
      {selected.prescription?.medicineCount || "-"}
    </p>

    <p>
      <b>Medicines:</b>{" "}
      {selected.prescription?.medicines || "-"}
    </p>

    <p>
      <b>Dosage:</b>{" "}
      {selected.prescription?.dosage || "-"}
    </p>

    <p>
      <b>Times Per Day:</b>{" "}
      {selected.prescription?.timesPerDay || "-"}
    </p>

    <p>
      <b>Duration:</b>{" "}
      {selected.prescription?.duration || "-"}
    </p>

    <p>
      <b>Precautions:</b>{" "}
      {selected.prescription?.precautions || "-"}
    </p>

    <p>
      <b>Doctor's Notes:</b>{" "}
      {selected.prescription?.notes || "-"}
    </p>

  </div>

</div>








<div className="flex justify-between mt-8">



<p className="text-green-700">

✔ Verified by Doctor

</p>



<div className="flex flex-col items-center">
  <img
    src={img}
    alt="Doctor Signature"
    className="w-60 h-auto object-contain"
  />
  <p className="text-m text-gray-600 -mt-1">
    Doctor Signature
  </p>
</div>



</div>








</div>







</div>









<div className="flex justify-between p-6 border-t">



<Button onClick={downloadPDF}>

Download PDF

</Button>






<Button

variant="outline"

onClick={()=>setSelected(null)}

>

Close

</Button>



</div>







</div>





</div>



}








</div>





</DashboardLayout>


)

}



export default Prescription;