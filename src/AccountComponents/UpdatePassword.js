import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../firebase";
import {
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { upDateUser } from "../app/userSlice";

const UpdatePassword = ({ isVisible,onClose }) => {
  const user = useSelector((state) => state.user.user);
  const [userDetails, setUserDetails] = useState({});
  const [updatePasswordDetails, setupdatePasswordDetails] = useState({});
  const [isDisible,setIsDisible]=useState(true)
  const [errorMsg,setErrorMsg]=useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    setUserDetails(user);
  }, [user]);
  console.log(user);
  console.log(updatePasswordDetails)
  const handelPassword = (e) => {
    console.log(e.target.value);
    setupdatePasswordDetails({
      ...updatePasswordDetails,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value.length)
       
    if(  e.target.value.length <=8){
        setErrorMsg("character must be more than 8 latter")
              
               console.log("false")
    }else{
        setIsDisible(false)
       // setIsDisible(true)
       setErrorMsg("")
    }
  };
  console.log(updatePasswordDetails);

  const handleUpdate = async () => {
    console.log(updatePasswordDetails.Password);
    const { Password, Re_Enter_Password } = updatePasswordDetails;
   if(Password !== undefined && Re_Enter_Password !== undefined ){
    console.log(Password)
    
    if (
        Password === Re_Enter_Password 
       ) {
         console.log(updatePasswordDetails ,"up");
         setUserDetails({
           ...userDetails,
           Password: Password,
         });
         try {
           if (auth.currentUser) {
             console.log(auth.currentUser,"auth");
             console.log("Updating password for user: ", auth.currentUser.uid);
   
             /* const credential= EmailAuthProvider.credential(auth.currentUser.email,currentPassword)
                   await reauthenticateWithCredential(auth.currentUser,credential)
                   console.log("Reauthenticated successfully ") */
   
             await updatePassword(auth.currentUser, Password);
             console.log("Password updated in Firebase Auth");
             const userDoc = doc(db, "users", auth.currentUser.uid);
             await updateDoc(userDoc, {
               Password,
             });
   
             const upDateUserDetails = { ...userDetails, Password };
             console.log(upDateUserDetails);
             dispatch(upDateUser(upDateUserDetails));
             console.log("User details updated in Redux store");
             onClose()
           }
         } catch (error) {
           console.log(error);
         }
       } else {
         console.log("both above password must be same");
       }
   }else{
      console.log("please enter password ")
      setIsDisible(true)
   }
  };
  const handleUpdate2=()=>{
      const {Password,Re_Enter_Password}=updatePasswordDetails
      console.log(Password)
      if(Password !== undefined && Re_Enter_Password !==undefined){
      console.log(Password)
      }else{
      console.log("please")
      }

  }
  const handleContainer=(e)=>{
    if(e.target.id ==="outer-container") return (onClose(), setErrorMsg(''))
  }
  if (!isVisible) return null;
  return (
    <div id="outer-container" onClick={handleContainer} className="fixed inset-0 bg-black w-screen h-screen bg-opacity-25 backdrop-blur-lg flex justify-center items-center">
      <div className="bg-white flex flex-col items-center font-medium rounded-lg h-[200px]">
        <div className="m-4 pt-4">
          <label className="mx-3" > New Password</label>
          <input
            type="password"
            name="Password"
            onChange={handelPassword}
            className="bg-gray-200 rounded-lg mx-4 border-2 border-gray-300" 
          />
          <div className="text-red-500">{errorMsg}</div>
        </div>
        <div className="m-4">
          <label>Re-enter password</label>
          <input
            type="password"
            name="Re_Enter_Password"
            onChange={handelPassword}
            className="bg-gray-200 rounded-lg mx-3 border-2 border-gray-300 "
          />
        </div>
        <div  >
          <button disabled={isDisible} className="bg-rose-600 text-white rounded-lg p-2 m-2 disabled:bg-white disabled:text-gray-400  border-2 border-gray-300" onClick={handleUpdate}> Update Password </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
