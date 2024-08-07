import { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { logInUser } from "../app/userSlice"
import { useCookies } from "react-cookie"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebase"
import { doc, setDoc } from "firebase/firestore"




const NewRegister=({setPageShow,onClose})=>{
  const [userDetails,setUserDetails]=useState({})
   const [cookies,setCookies,removeCookies]=useCookies(["userDetails"])
   const dispatch=useDispatch()
 useEffect(()=>{
  if(cookies.userDetails){
    dispatch(logInUser(cookies.userDetails))
  }
 },[cookies,dispatch])
 
 const handleUserDetails=(e)=>{
   setUserDetails({...userDetails,[e.target.name]:e.target.value})
 }

 const handleSubmit=async (e)=>{
    e.preventDefault()
  try{
    const {Email,Password,FirstName,LastName}=userDetails
    await createUserWithEmailAndPassword(auth,Email,Password)
     if(auth.currentUser){
      await setDoc(doc(db,"users",auth.currentUser.uid),{
        Email,
        Password,
        FirstName,
        LastName,

      })
     }
    
    setCookies("userDetails",userDetails,{path:"/"})
    dispatch(logInUser(userDetails))

     
     onClose()
     
    
  }
  catch(err){
    console.log(err)
  }
 }
 
    return(
        <div className="text-center">
            <div>
            <div>
                     <h1 className="font-bold text-black">Register for Food</h1>
                </div>
                <div>
                    <h1>Already have an account ? <button onClick={()=>setPageShow(true)} className="border-b-2">Sign In</button> </h1>
                </div>
            </div>
        
                
                <form>
            <div className="flex flex-col text-center ">
              <div className="flex flex-col my-4">
                <label>Email</label>
                <input
                  type="email"
                  name="Email"
                 
                  className=" bg-gray-100 border-2 mx-[30%]  rounded-lg outline-gray-500"
                  onChange={handleUserDetails}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mx-6">Password</label>
                <input
                  type="password"
                  name="Password"
                  className=" bg-gray-100 border-2 mx-[30%] rounded-lg outline-gray-500"
                  onChange={handleUserDetails}
                />
              </div>
              <div className="flex justify-center my-4">
                <div className="flex ">
                    <label>First Name</label>
                    <input type="text" name="FirstName" onChange={handleUserDetails} className=" bg-gray-100 border-2 mx-2  rounded-lg outline-gray-500" />
                </div>
                <div className="flex">
                    <label>Last Name</label>
                    <input type="text" name="LastName" onChange={handleUserDetails}  className=" bg-gray-100 border-2 mx-2 rounded-lg outline-gray-500"    />
                </div>
              </div>
              <div>
                <button onClick={handleSubmit} className=" rounded-lg mb-8 mt-4 py-1 bg-gray-200 px-[17%]" >
                  Sign In
                </button>
              </div>
              <div className="mb-8">
                <h1>forgot your password ?</h1>
              </div>
            </div>
          </form>
        </div>
    )
}

export default NewRegister