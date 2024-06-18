import { IMG_URL } from "../utils/constants"

const RestaurantCard=({resData})=>{
     console.log(resData)
     const {name,cuisines,rating,bannerImageKey}=resData
      console.log(bannerImageKey)
     console.log(IMG_URL + bannerImageKey)
      return(
        <div className="restarant-card">
       {/*  <img src={IMG_URL+bannerImageKey} /> */}
         <img className="IMG_URL" src={IMG_URL + bannerImageKey} />

               <h3>{name}</h3>
               <h4>{cuisines?.join(", ")}</h4>
                <h4>{rating?.score}</h4>
              {/*  <h4>₹ {costForTwo /100} FOR TWO</h4>
               <h4>{deliveryTime} minutes</h4> */}
        </div>
      )
    } 

    export default RestaurantCard