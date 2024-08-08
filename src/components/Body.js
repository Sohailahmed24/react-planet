import { useEffect, useMemo, useState } from "react"
import RestaurantCard from "./RestaurantCard"
import Shimmer from "./Shimmer"


import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"
import { fetchAsync } from "../app/restaurantSlice"
import SearchComponent from "./SearchComponent"


import { Cookies, useCookies } from "react-cookie"
import { logInUser } from "../app/userSlice"
import useScrollerInfinte from "./useScrollerInfinte"
import useOnlineStatus from "../utils/useOnlineStatus";


const Body=()=>{
 
  const {initialObj:data,status:pending}=useSelector(state=>state.restaurants)
  const [cookies,setCookies,removeCookies]=useCookies(["userDetails"])

  const dispatch = useDispatch()
     const status=useOnlineStatus()

    useEffect(()=>{
     dispatch(fetchAsync())

    },[])
   
      useEffect(()=>{
        if(cookies.userDetails){
            dispatch(logInUser(cookies.userDetails))
        }
       },[cookies,dispatch])
      
        const newResult=useScrollerInfinte(data)
      
         const filteredRestaurants = useMemo(() => {
    console.log("Starting filter time measurement");
    console.time("filter time");
    const result = data?.results?.filter((item) => item.type === "outlet");
    
   
    return result;
  }, [data]);
      

   if(status === false) return (
    <div>
      <h1 className="text-red-900">Looks like you're offline !! please check your internet connection OR Internet loss</h1>
    </div>
   )
    if(pending === "loading"){
     return (
     <>
     
      <Shimmer/>
     </>
     )
    }
 


    return(
      <div className=" body">   
     
     <div >
 
       <SearchComponent/>
     </div>
           <div className="flex flex-wrap group:">
            
            {
                newResult?.map(item=> <>
               
                   <Link to={"/outlet/"+item.outletCode} key={item.restaurantCode} >
                                  <RestaurantCard   resData={item} />
                    </Link>
                </>)
            }
               
           </div>


           <div>



           </div>



      </div>
    )
  }
  export default Body