import axios from "axios"




export const fetchRestaurantCard=async (outletCode)=>{
  return    await axios.post("http://localhost:8080/https://food.noon.com/_svc/mp-food-api-mpnoon/consumer/restaurant/outlet/details/guest"
        ,{
            outletCode: outletCode,
         
        },{
        headers:{
            "Content-Type":"application/json",
            "Authorization":" _API_KEY_HERE"
        }
    })
}