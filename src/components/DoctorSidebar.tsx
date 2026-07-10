import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Star,
  UserRound,
  LogOut
} from "lucide-react";

import "../test/doctordashboard.css"
export default function DoctorSidebar() {


const menuItems = [

{
name:"Home",
path:"/dashboard/doctor",
icon:<LayoutDashboard size={20}/>
},


{
name:"Patients",
path:"/dashboard/users",
icon:<Users size={20}/>
},


{
name:"Consultations",
path:"/dashboard/doctorconsultations",
icon:<CalendarDays size={20}/>
},


{
name:"Reviews",
path:"/dashboard/doctorreviews",
icon:<Star size={20}/>
},


{
name:"Notifications",
path:"/dashboard/notifications",
icon:<UserRound size={20}/>
}


];




return (


<aside className="sidebar">



{/* Website Name */}

<div className="sidebar-header">


<h2>

🌿 Dr. Nandita

</h2>


<p>

Homeopathic Clinic

</p>


</div>





{/* Navigation */}


<nav className="sidebar-menu">


{

menuItems.map((item)=>(


<NavLink

key={item.path}

to={item.path}

className={({isActive})=>

isActive
?
"sidebar-link active"
:
"sidebar-link"

}


>


{item.icon}


<span>

{item.name}

</span>



</NavLink>


))


}



</nav>






{/* Logout */}


<button className="sidebar-logout">


<LogOut size={18}/>


Logout


</button>




</aside>


)


}