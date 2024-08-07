import axios from "axios"



export const restaurantSearchFetchAPI=()=>{
    return axios.get("https://food.noon.com/_svc/mp-food-api-catalog/api/light/")
}