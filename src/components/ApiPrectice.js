import axios from "axios";
import { useEffect, useState } from "react";

const ApiPrectice = () => {
  const [data, setData] = useState([]);

  const fetchData = async() => {
    try {
        console.log("Fetching  data from API...");
        const response = await axios.get(`${process.env.VERCEL_URL}https://food.noon.com/_svc/mp-food-api-catalog/api/`);
        console.log("API Response: ", response);
        console.log("Response Data:", response.data);
        setData(response.data.results); // Adjust based on your data structure
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(process.env.REACT_APP_API_URL ,"vercel")
  }, []);

  return (
    <div>
      <h1>API DATA  </h1>
      {/* Render your data here */}
    </div>
  );
};
/* 
const response = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/https://food.noon.com/_svc/mp-food-api-catalog/api/`) */;

export default ApiPrectice;
