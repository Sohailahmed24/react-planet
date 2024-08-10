import axios from "axios"




/* export const fetchRestaurantCard=async (outletCode)=>{
  return    await axios.post("http://localhost:8080/https://food.noon.com/_svc/mp-food-api-mpnoon/consumer/restaurant/outlet/details/guest"
        ,{
            outletCode: outletCode,
         
        },{
        headers:{
            "Content-Type":"application/json",
            "Authorization":" _API_KEY_HERE"
        }
    })
} */ 
    export const fetchRestaurantCard = async (outletCode) => {
        // Use the environment variable or fallback to localhost for development
        const apiUrl = process.env.VERCEL_URL || 'http://localhost:8080';
        const url = `${apiUrl}/https://food.noon.com/_svc/mp-food-api-mpnoon/consumer/restaurant/outlet/details/guest`;
    
        return await axios.post(url, {
            outletCode: outletCode,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "_API_KEY_HERE"  // Replace with your actual API key
            }
        });
    }