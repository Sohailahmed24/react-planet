import axios from "axios"




export const HomePageCuisineAPI=async (url)=>{
   
    return axios.get(`https://food.noon.com/_svc/mp-food-api-catalog/api/${url}`)
}