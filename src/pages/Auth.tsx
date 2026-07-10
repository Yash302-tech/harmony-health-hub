import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import authBg from "@/assets/auth-bg.jpg";
import DoctorHome from "./DoctorHome";

// Firebase
import { auth, provider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";


type AuthMode = "signin" | "signup";

const Auth = () => {

  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();


    try {


      // SIGNUP
      if (authMode === "signup") {


        if(formData.password !== formData.confirmPassword){

          toast.error("Passwords do not match!");
          return;

        }


        const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );


        const user = userCredential.user;



        // Save user data
        await setDoc(doc(db,"users",user.uid),{

          uid:user.uid,
          name:formData.fullName,
          email:formData.email,
          phone:formData.phone || "",

          // added feature
          role:"patient"

        });



        toast.success("Account created successfully!");

        navigate("/dashboard");


      }

      // LOGIN
      else {


        const result =
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );


        const user = result.user;



        // Get role from Firestore
        const userDoc =
        await getDoc(doc(db,"users",user.uid));



        if(userDoc.exists()){


          const userData = userDoc.data();



          if(
            userData.role === "admin" ||
            userData.role === "doctor"
          ){

            navigate("/dashboard/doctor");

          }

          else{

            navigate("/dashboard");

          }


        }


        toast.success("Welcome back!");


      }



    }

    catch(error:any){

      toast.error(error.message);

    }


  };




  // GOOGLE LOGIN

  const handleGoogleLogin = async()=>{


    try{


      const result =
      await signInWithPopup(auth,provider);


      const user=result.user;



      await setDoc(
        doc(db,"users",user.uid),

        {

          uid:user.uid,
          name:user.displayName,
          email:user.email,
          photo:user.photoURL,

          // added feature
          role:"patient"

        },

        {
          merge:true
        }

      );



      toast.success("Signed in with Google!");

      navigate("/dashboard");


    }

    catch(error:any){

      toast.error(error.message);

    }


  };




return (

<div className="min-h-screen flex">


{/* LEFT SIDE */}

<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">


<img
src={authBg}
alt="Botanical pattern"
className="absolute inset-0 w-full h-full object-cover"
/>


<div className="hero-gradient absolute inset-0" />


<div className="relative z-10 text-center px-12">


<Leaf className="w-16 h-16 text-primary-foreground mx-auto mb-6"/>


<h1 className="text-4xl font-display font-bold text-primary-foreground mb-2">

Dr. Nandita Karmakar

</h1>


<p className="text-lg text-primary-foreground/90">

Homeopathic Practitioner

</p>


<p className="text-primary-foreground/70">

Personalized natural healing — now available online

</p>


</div>


</div>





{/* RIGHT SIDE */}


<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">


<div className="w-full max-w-md animate-fade-in">



<div className="text-center mb-8">


<h2 className="text-2xl font-semibold">

{authMode==="signin"
?"Welcome Back"
:"Create Account"}

</h2>


</div>




<Tabs
value={authMode}
onValueChange={(v)=>setAuthMode(v as AuthMode)}
className="mb-6"
>


<TabsList className="grid w-full grid-cols-2">


<TabsTrigger value="signin">

Sign In

</TabsTrigger>



<TabsTrigger value="signup">

Sign Up

</TabsTrigger>



</TabsList>


</Tabs>





<form
onSubmit={handleSubmit}
className="space-y-4"
>



{
authMode==="signup" &&

<Input

name="fullName"

placeholder="Full Name"

value={formData.fullName}

onChange={handleChange}

required

/>

}




<Input

name="email"

type="email"

placeholder="Email"

value={formData.email}

onChange={handleChange}

required

/>





<Input

name="password"

type="password"

placeholder="Password"

value={formData.password}

onChange={handleChange}

required

/>





{
authMode==="signup" &&


<Input

name="confirmPassword"

type="password"

placeholder="Confirm Password"

value={formData.confirmPassword}

onChange={handleChange}

required

/>

}




<Button type="submit" className="w-full">


{
authMode==="signin"
?"Sign In"
:"Create Account"

}


</Button>




<Button
type="button"
onClick={handleGoogleLogin}
className="w-full"
>


Continue with Google


</Button>




</form>



</div>


</div>


</div>

);


};


export default Auth;