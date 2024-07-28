import { Link, Outlet } from "react-router-dom"





const Account=()=>{
 
    return(
        <div className="flex mx-20 ">
               <nav className="m-10">
               <ul>
                   <li> 
                    <Link to="Profile">Profile</Link>
                   </li>
                   <li>
                       <Link to="AddressBook"> Address Book </Link>
                   </li>
                    <li>
                    <Link to="PaymentCards"> Payment Cards </Link>
                    </li>
                    <li> 
                      <Link to="Orders"> Orders</Link> 
                    </li>
                   <li>
                   <Link to="NoonCredits"> Noon Credits</Link>
                   </li>
                    <li> Sign Out</li>
                </ul>
               </nav>
              <div className="mx-20">
                  <Outlet/>
              </div>
        </div>
    )
}

export default Account