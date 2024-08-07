import axios from "axios"



const fetchSearchCardApi=(quary)=>{
  
   return axios.get(`https://food.noon.com/_svc/mp-food-api-catalog/api/suggestions?q=${quary}`)

}

export default fetchSearchCardApi    
 