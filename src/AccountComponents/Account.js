import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { logOut } from "../app/userSlice"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useCookies } from "react-cookie"





const Account=()=>{
    const [cookie,setCookie,removeCookies]=useCookies(["userDetails"])
    const navigate=useNavigate()

    const dispatch=useDispatch()

    const handleSignOut=useCallback(()=>{
       dispatch(logOut())
       signOut(auth)
       removeCookies("userDetails")
       navigate("/")
    },[])
 
    return(
        <div className="flex mx-20 ">
               <nav className="m-10">
               <ul>
                   <li className="my-3 hover:border-l-2 hover:border-rose-600"> 
                    <Link to="Profile">Profile</Link>
                   </li>
                   <li className="my-3  hover:border-l-2 hover:border-rose-600">
                       <Link to="AddressBook"> Address Book </Link>
                   </li>
                    <li className="my-3 hover:border-l-2 hover:border-rose-600">
                    <Link to="PaymentCards"> Payment Cards </Link>
                    </li>
                    <li className="my-3 hover:border-l-2 hover:border-rose-600"> 
                      <Link to="Orders"> Orders</Link> 
                    </li>
                   <li className="my-3 hover:border-l-2 hover:border-rose-600">
                   <Link to="NoonCredits"> Noon Credits</Link>
                   </li>
                    <li className="my-3"> 
                        <button className="bg-rose-600 rounded-lg p-1 px-2" onClick={handleSignOut}>Sign Out</button>
                    </li>
                </ul>
               </nav>
              <div className="mx-20">
                  <Outlet/>
              </div>
        </div>
    )
}

export default Account