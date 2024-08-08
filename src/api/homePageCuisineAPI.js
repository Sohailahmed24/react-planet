import axios from "axios"


const homePageCuisineAPI=(url)=>{
   
    return axios.get(`https://food.noon.com/_svc/mp-food-api-catalog/api/${url}`)
}

export default homePageCuisineAPI