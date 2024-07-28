import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { upDateUser } from "../app/userSlice"
import { updateCurrentUser, updateProfile } from "firebase/auth"
import { auth, db } from "../../firebase"
import { doc, updateDoc } from "firebase/firestore"
import UpdatePassword from "./UpdatePassword"


const Profile=()=>{
    const user=useSelector(state=>state.user.user)
    const [updateUserDetails,setupdateUserDetails]=useState({})
    const [showModal,setShowModal]=useState(false)
    const [isDisible,setIsDisible]=useState(true)
    const dispatch=useDispatch()
   console.log(user)
useEffect(()=>{
    setupdateUserDetails(user)
},[])

  const handleName=(e)=>{
    setIsDisible(false)
   // setupdateUserDetails(prev=>({...prev,[e.target.name]:e.target.value}))
   setupdateUserDetails({...updateUserDetails,[e.target.name]:e.target.value})
  }

    const handleUpdate=async()=>{
       
         try{
            if(auth.currentUser){
                await updateProfile(auth.currentUser,{displayName:`${updateUserDetails.FirstName} ${updateUserDetails.LastName}`})
                const userDoc= doc(db,"users",auth.currentUser.uid)
                await updateDoc(userDoc,{
                    FirstName:updateUserDetails.FirstName,
                    LastName:updateUserDetails.LastName
                })
            }   
            dispatch(upDateUser(updateUserDetails))

         }
         catch(err){
                 console.log(err)
         }
       
         
    }
  console.log(user ,updateUserDetails)
    return(
        <div className="mx-10">
            
            <div>
                <h1 className="font-bold">Genreal Info</h1>
                <div className="flex m-4  ">
                    <div className="flex flex-col ">
                        <lable className="my-2" >First Name</lable>
                        <input type="text" value={updateUserDetails?.FirstName} onChange={handleName} name="FirstName"  className="mx-4 px-8 bg-gray-100 py-1 rounded-lg border-2 border-gray-300"/>
                    </div>
                    <div className="flex flex-col">
                        <lable className="my-2">Last Name</lable>
                        <input type="text" name="LastName" value={updateUserDetails?.LastName} onChange={handleName} className="mx-4 px-8 bg-gray-100 py-1 rounded-lg border-2 border-gray-300" />
                    </div>
                </div>
                <button onClick={handleUpdate} disabled={isDisible} className="bg-rose-600 text-white py-1 px-5 rounded-lg border-2 border-gray-300 disabled:bg-gray-200 disabled:text-gray-400 " >Update Info</button>
            </div>
            <div className="my-10 border-t-2 py-6">
                <h1 className="font-bold">Security</h1>
                <div className="flex " >
                   <div className="flex flex-col m-4">
                    <lable>Email</lable>
                    <input value={updateUserDetails?.Email} disabled className="bg-gray-100 px-8 py-1 mx-4 rounded-lg text-gray-400 border-2 border-gray-200" type="text"/>
                   </div>
                   <div className="flex flex-col m-4">
                    <lable>Password</lable>
                    <input value={updateUserDetails?.Password} disabled className="bg-gray-100 px-8 py-1 mx-4 rounded-lg text-gray-400 border-2 border-gray-200" type="password"/>
                   </div>
                   
                </div>
                <div>
                    <button onClick={()=>setShowModal(true)} className="border-2 border-gray-400 py-1 px-5" >Change Password</button>
                   </div>
                <UpdatePassword isVisible={showModal} onClose={()=>setShowModal(false)} />
            </div>

        </div>
    )
}

export default Profile