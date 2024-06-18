import { useEffect, useState } from "react"
import resList from "../utils/mockData"
import RestaurantCard from "./RestaurantCard"
import axios from "axios"
import Shimmer from "./Shimmer"


const Body=()=>{
    const [cardData,setCardData]=useState([])
    const [filterName,setFilterName]=useState(true)
    const [inputTxt,setInputTxt]=useState()
    const [filterRestaurent,setFilterRestaurent]=useState([])

    useEffect(()=>{
    //  fetchApi()
      getData()
    },[])

    const handleFilterBtn=()=>{
       if(filterName === true){
        const data=resList.filter(item=> item.data.avgRating >4)
        setCardData(data)
        setFilterName(!filterName)
       }else{
        setCardData(resList)
        setFilterName(!filterName)
       }
    }
    const handleFilterAll=()=>{
        setCardData(resList)
    }
  /*   const fetchApi= async()=>{
      const data=await fetch("https://food.noon.com/_svc/mp-food-api-catalog/api/")
      const json=await data.json()
    //   console.log(json)
    } */
    const getData = async ()=>{
       const {data}= await axios.get("https://food.noon.com/_svc/mp-food-api-catalog/api/")
       
       const filter=data.results.filter(item=> item.type === "outlet")
      
      
       setCardData(filter)
       setFilterRestaurent(filter)
    }

 const handleSearchFilter=()=>{
      const result=cardData.filter(item=>item.name.toUpperCase().includes(inputTxt.toUpperCase()))
      setFilterRestaurent(result)
 }

    if(cardData.length === 0){
     return  <Shimmer />
    }



    return(
      <div className="body">  
        <div className="filter">
           <div>
              <input value={inputTxt} onChange={(e)=>setInputTxt(e.target.value)} />
              <button onClick={handleSearchFilter}>Search</button>
           </div>
                <button className="filter-all" onClick={handleFilterAll}>All Restaurant</button>
                <button className="filter-btn" onClick={handleFilterBtn}>{(filterName === true)?"Top Restaurant":"All"}</button>
        </div>
           <div className="restaurant-Container">
            {
              filterRestaurent.map(item=> <RestaurantCard   resData={item} />)
            }
               
           </div>
      </div>
    )
  }
  export default Body