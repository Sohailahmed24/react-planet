import axios from "axios"




 const homePageCuisineApi= (url)=>{
   
    return axios.get(`https://food.noon.com/_svc/mp-food-api-catalog/api/${url}`)
}

export default homePageCuisineApi 