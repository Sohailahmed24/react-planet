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
  const [errorMsg2,setErrorMsg2]=useState("")
  const [errorPassword,setErrorPassword]=useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    setUserDetails(user);
    
  }, [user]);
  
  
  const handelPassword = (e) => {
    setErrorPassword("")
    
    setupdatePasswordDetails({
      ...updatePasswordDetails,
      [e.target.name]: e.target.value,
    });
   
       
    if(  e.target.value.length <=8){
         if(e.target.name ==="Password"){
          setErrorMsg("password should br more than 8 character")
         }
          else{
            
            setErrorMsg2("password should br more than 8 character")
          }    
               
    }else{
        setIsDisible(false)
      
       setErrorMsg("")
       setErrorMsg2("")
    }
  };
 

  const handleUpdate = async () => {
    
    const { Password, Re_Enter_Password } = updatePasswordDetails;
   if(Password !== undefined && Re_Enter_Password !== undefined ){
    
      setErrorPassword("Both above password must be same")
    if (
        Password === Re_Enter_Password 
       ) {
       
         setUserDetails({
           ...userDetails,
           Password: Password,
         });
         try {
           if (auth.currentUser) {
             
   
    
             await updatePassword(auth.currentUser, Password);
             
             const userDoc = doc(db, "users", auth.currentUser.uid);
             await updateDoc(userDoc, {
               Password,
             });
   
             const upDateUserDetails = { ...userDetails, Password };
            
             dispatch(upDateUser(upDateUserDetails));
            
             onClose()
           }
         } catch (error) {
           console.log(error);
         }
       } else {
         console.log("both above password must be same");
       }
   }else{
 
      setIsDisible(true)
   }
  };
 
  const handleContainer=(e)=>{
    if(e.target.id ==="outer-container") 
      return (
    setIsDisible(true),
    onClose(),
     setErrorMsg(''),
     setErrorMsg2(""),
    setErrorPassword(""))
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
          <div className="text-red-600">{errorMsg}</div>
        </div>
        <div className="m-4">
          <label>Re-enter password</label>
          <input
            type="password"
            name="Re_Enter_Password"
            onChange={handelPassword}
            className="bg-gray-200 rounded-lg mx-3 border-2 border-gray-300 "
          />
          <p className="text-red-600">{errorMsg2}</p>
        </div>

        <p className="text-red-500">{errorPassword}</p>
        <div  >
          <button disabled={isDisible} className="bg-rose-600 text-white rounded-lg p-2 m-2 disabled:bg-white disabled:text-gray-400  border-2 border-gray-300" onClick={handleUpdate}> Update Password </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
