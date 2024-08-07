import axios from "axios"



export const fetchRestaurant=()=>{
   
    return  axios.get("https://food.noon.com/_svc/mp-food-api-catalog/api/")
}