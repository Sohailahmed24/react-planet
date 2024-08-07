import { useEffect, useState } from "react"
import {  IMG_THUMB_UP2, IMG_URL } from "../utils/constants"

const RestaurantCard=({resData})=>{
     const [priceSymbole,setPriceSymbole]=useState("$$$$")
     const [deliveryPrice,setDeliveryPrice]=useState("")
   
     const {name,cuisines,rating,bannerImageKey,price,delivery,tag}=resData
  
  useEffect(()=>{
     handlePriceSymbole()
     if(delivery.fee === null){
      setDeliveryPrice("Free delivery")
     }
  },[])
   const handlePriceSymbole=()=>{
    if(price.length ===4){
      setPriceSymbole("")
    }else if(price.length ===3){
      setPriceSymbole("$")
    }else if(price.length === 2){
      setPriceSymbole("$$")
    }else if(price.length === 1){
      setPriceSymbole("$$$")
    }
    
   }
      return(

    <section  className=" h-screen flex justify-center rounded-lg m-4 items-center gap-x-16 text-white" >
      <div className="w-[280px] h-[320px] bg-transparent cursor-pointer group perspective rounded-lg">
        <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000 rounded-lg" >
          <div className="absolute backface-hidden border-2 w-full h-full text-center rounded-lg">
            <img src={IMG_URL + bannerImageKey} className="w-full h-2/3" />
            <div className="relative bottom-7 left-[70px] text-center rounded-lg  bg-white mx-20" >
              <h1 className="font-bold text-black">{delivery?.time} mins</h1>
            </div>
            <h3 className="font-bold mt-3 text-rose-700 ">{name}</h3>
          </div>
          <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-gray-100 overflow-hidden" >
            <div className="text-center flex flex-col items-center justify-center h-full text-gray-800 px-2 pb-24" >
              <h1 className="text-2xl font-bold mt-3">{name}</h1>
              <p className="my-2 font-medium">9.0 Rating</p>
              <h4>{cuisines?.join(", ")}</h4>
              <div className="flex ">
                        
                        <img src={IMG_THUMB_UP2} className="w-5 h-5 mx-1 my-0"   />
                      
                       
                       {
                          (rating?.score)?<h4 className="-my-0.5 font-medium">{rating?.score}</h4>:<h4 className="font-medium">4.1</h4>
                       }
                       </div>
            
              <div className="flex ">
                          <h1 className="font-bold"> {price}</h1> <p className="text-slate-300">{priceSymbole}</p>
                          </div>
                          <div className="text-green-500 font-bold">{deliveryPrice}</div>
              <button className="bg-rose-600  px-6 py-2 font-semibold text-white rounded-full absolute -bottom-20 delay-500 duration-1000 group-hover:bottom-14 scale-0 group-hover:scale-125">
                More Details
              </button>
            </div>
          </div>
        </div>
      </div>
        </section>
       
      )
    } 

    export default RestaurantCard