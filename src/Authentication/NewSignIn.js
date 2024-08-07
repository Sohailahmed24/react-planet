import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { logInUser } from "../app/userSlice";
import { useCookies } from "react-cookie";

const NewSignIn = ({ setPageShow, onClose }) => {
  const [Email,setEmail]=useState("")
  const [Password,setPassword]=useState("")
  const [cookies, setCookie] = useCookies(["userDetails"]);

  const dispatch=useDispatch()
  
 

const handleLogIn=async(e)=>{
  e.preventDefault()
  try{
 const userCredential= await  signInWithEmailAndPassword(auth,Email,Password)
 const user=userCredential.user
 
 const docref= doc(db,"users",user.uid)
 const docSnap=await getDoc(docref)
 if(docSnap.exists()){
 
  const userData=docSnap.data()
  dispatch(logInUser(userData))
  setCookie("userDetails",userData,{path:"/"})
  onClose()
}
 
 
   
  }
  catch(err){
    console.log(err)
  }
}

  return (
    <div>
    
      <div className=" flex flex-col text-center  ">
        <button
          className="place-self-end text-red-700 "
          onClick={() => onClose()} 
        >
          X
        </button>
        <div className="mb-4">
            <div>
                <h1 className="font-bold text-black">Welcome Back</h1>
            </div>
          <div>
            <h1 className="text-gray-400">
              Don't have an account ? {" "}
              <button onClick={() => setPageShow(false)} className="border-b-2">Register here</button>{" "}
            </h1>
          </div>
        </div>
        <div >
          <form>
            <div className="flex flex-col  ">
              <div className="flex flex-col my-4">
                <label>Email</label>
                <input
                  type="email"
                  className=" bg-gray-100 border-2 mx-[30%]  rounded-lg outline-gray-500"
                  value={Email}
                  onChange={e=>setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mx-6">Password</label>
                <input
                  type="password"
                  className=" bg-gray-100 border-2 mx-[30%] rounded-lg outline-gray-500"
                  value={Password}
                  onChange={e=>setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className=" rounded-lg mb-8 mt-4 py-1 bg-gray-200 px-[17%]" onClick={handleLogIn}>
                  Sign In
                </button>
              </div>
              <div className="mb-8">
                <h1>forgot your password ?</h1>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSignIn;
