import {  useSelector } from "react-redux"
import RestaurantCard from "./RestaurantCard";
import { IMG_THUMB_UP2, IMG_URL } from "../utils/constants";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";



const SearchCard=({isVisible,onClose})=>{
    const searchCardData=useSelector(state=>state.SearchCard.initialObj)

    const handleClose=()=>{
      onClose()
    }

   const cardSearch=useMemo(()=>{
      return{
        filterCard:searchCardData?.data?.filter(item=>item.type =="outlet")
      }
   },[searchCardData])

   
  
  
 

  
if(!isVisible) return null
    return(
        <div  className="fixed inset-[70px] h-[400px]  bg-opacity-25 backdrop-blur-lg flex flex-col justify-center items-center " >
          <div className="flex justify-center">
                         <button onClick={handleClose} className="bg-rose-700 text-black rounded-lg px-6 py-1 hover:text-white">Close</button>
                         </div>
        <div className="flex flex-wrap bg-white w-[100%] h-[100%]  justify-center text-red-600 rounded-t-3xl overflow-scroll  no-Scrollbar ">
       
       {
        searchCardData?.data?.filter(item=>item.type =="outlet")?.map((item,ind)=>
         <div id={ind} className="m-8 " onClick={handleClose} >
           
               <Link to={"/outlet/"+item.outletCode} key={item.restaurantCode}>
             <div className="py-8 px-1 m-5 w-[200px] -my-5 mx-8  rounded-lg bg-gray-50 hover:scale-[1.2] duration-500 hover:bg-gray-100 ">
           

            <div className="relative top-6 left-[-75px] mx-20 bg-lime-500 rounded-lg text-center text-white">
             <div className="font-semibold" >
               {item?.tag}
             </div>
            </div>
             <div>
             <img className="rounded-xl" src={IMG_URL + item.bannerImageKey} />
                 <div className="relative bottom-7 left-[70px] text-center rounded-lg  bg-white -ml-8 mx-20" >
                   <h1 className="font-bold">{item.delivery?.time} mins</h1>
                 </div>
             </div>
                         <div className="flex justify-between ">
                         <div>
                         <h3 className="font-bold  ">{item.name}</h3>
                         </div>
                            <div className="flex ">
                             
                             <img src={IMG_THUMB_UP2} className="w-5 h-5 mx-1 my-0"   />
                           
                            
                            {
                               (item.rating?.score)?<h4 className="-my-0.5 mr-5 text-black font-medium">{item.rating?.score}</h4>:<h4 className="mr-5 text-black font-medium">4.1</h4>
                            }
                            </div>
                         </div>
                           <div className="flex  my-2 mx-2">
                           <h4 className="mr-1 text-black font-normal " >{item.cuisines?.join(", ")}</h4>
                           <h1 className="font-normal text-black mr-1 ">{item.delivery.time} mins</h1> {/* <p className="text-slate-300">{priceSymbole}</p> */}
                              
                           </div>
             </div>
           
           </Link>
         </div>
        )
       }
        </div>
</div>
    )
}

export default SearchCard