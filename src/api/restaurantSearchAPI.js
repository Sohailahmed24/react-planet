import axios from "axios"



export const fetchRestaurantSearch=()=>{
      return axios.post("https://food.noon.com/_svc/mp-food-api-catalog/api/search")
} 