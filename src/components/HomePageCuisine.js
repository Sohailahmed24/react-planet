import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"
import { fetchHomePageCuisine } from "../app/HomePageCuisineSlice"
import RestaurantCard from "./RestaurantCard"

import useScrollerInfinte from "./useScrollerInfinte"



const HomePageCuisine=()=>{
  const restaurantData=useSelector(state=>state.HomePageCuisine.initialObj)
    const [param]=useSearchParams()
    const dispatch=useDispatch()
    const cardDetails=useScrollerInfinte(restaurantData)
    const [error, setError] = useState(null);
  
    const data=param.get("url")
  
 
  useEffect(()=>{
    
   if(data){
    dispatch(fetchHomePageCuisine(data))
    
   }
  },[data,dispatch])
   return(
    <div className="flex flex-wrap">

     
     
        {
     cardDetails?.map(item=>
                   <Link to={"/outlet/"+item.outletCode} key={item.restaurantCode} >
                          <RestaurantCard   resData={item} />
                   </Link>
     )
        }
    </div>
   )
}


export default HomePageCuisine