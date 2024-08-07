import axios from "axios";



export const fetchSearchAPI = async (select) => {
  
 
    const payload = {
      tags: [],
      q: null,
      ratingMin: null,
    
       sort:select.selectedSort,
 
    f: { cuisines: select.selectedCuisines,dietary_restrictions:select.selectedDiet },
      limit: 50,
      type: "outlet",
      content: null,
      excludeOutletCodes: [],
      widget: null,
    };
  
    try {
      const response = await axios.post(
        'http://localhost:8080/https://food.noon.com/_svc/mp-food-api-catalog/api/search',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Addresskey': '',
            'X-Content': 'desktop',
            'X-Experience': 'food',
            'X-Lat': '252048493',
            'X-Lng': '552707828',
            'X-Locale': 'en-ae',
            'X-Mp': 'noon',
            'X-Platform': 'web',
            'X-Visitor-Id': '20f2c9cd-debc-40a5-8999-575bd7f52955',
          },
        }
      );
      console.log('Response Data:', response.data); 

      return response.data
     
     
    } catch (error) {
      console.error('Error fetching the API', error);
      
    }
  };