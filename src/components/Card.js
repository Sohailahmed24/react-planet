import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { cardAsync } from "../app/cardSlice";
import Shimmer from "./Shimmer";
import { IMG_THUMB_UP2, IMG_URL } from "../utils/constants";

import CardModal2 from "./CardModal2";

const Card = () => {
  const data = useSelector((state) => state.card.card.data);
  const categories = useSelector(
    (state) => state.card.card.data?.menu?.categories
  );
  const items = useSelector((state) => state.card.card.data?.menu?.items);
  const filterItems =useMemo( ()=>items?.filter((item) => item.itemDesc !== ""),[items]);
  const [showModal, setShowModal] = useState(false);
  const [filterId, setFilterId] = useState(null);

  
   
    
  const dispatch = useDispatch();
 
  const { outletCode } = useParams();
 
  useEffect(() => {
   
    dispatch(cardAsync(outletCode));
  }, [dispatch,outletCode]);

  const handleOnClose = useCallback(() => setShowModal(false),[]);
  const handleAddBtn = useCallback((id) => {
    console.log(id);
    setShowModal(true);
    setFilterId(id);
  },[])

  const handleHeading=useCallback((name)=>{
   
  const element=  document.getElementById(name)
  if(element){
        element.scrollIntoView({behavior:"smooth"})
  }else{
   console.log(`Element with id ${name} not found `)
  }
 },[])

  if (data === null) return <Shimmer />;

  return (
    <div>
      <CardModal2
        onClose={handleOnClose}
        visible={showModal}
        filterId={filterId}
      />
      <div className="flex ml-5">
       
        <div className="w-[650px]">
          {data?.images?.[0] && (
            <img
              src={IMG_URL + data?.images[0]}
              alt={data.name}
              className="w-max h-max "
            />
          )}
        </div>
                {
                  data && (
                    <div className="mx-5">
                  
                      <h1 className="font-bold">{data?.name}</h1>
                  
                   <p> {data?.cuisines.join(", ")}</p>
                    <div className="flex">
                        <span><img  src={IMG_THUMB_UP2} alt="thumb up" /></span>
                       
                    <p className="font-bold mx-2"> {data?.ratingScore}</p>
                    
                    <p> {data?.avgPrepTime} minutes</p>
                    </div> 
                  </div>
                  )
                } 
      </div>
      
        <div className="flex  ">
        <div className=" bg-gray-100 sticky -top-1 px-28 ml-14 mt-5 h-screen overflow-scroll no-scrollbar w-10 ">
        {
        categories?.map((category,ind)=>
          <div id={ind} onClick={()=>handleHeading(category.name)} className="-ml-14 mb-4 hover:border-l-[3px] hover:border-spacing-10 border-rose-600 cursor-pointer w-max ">
             <h4 className="mx-1" >{category.name}</h4>
          </div>
        )
        }
      </div>
              <div className="flex flex-col">
              
        {categories?.map((category) => (
          <div>
            <div>
              <h1 className="font-bold" id={category.name} >{category?.name}</h1>
            </div>
            <div className="flex flex-wrap ">
              {filterItems?.map(
                (item) => (
                  <div className="flex m-4 w-[250px]    hover:cursor-pointer hover:scale-[1.2] duration-500 bg-white border-2 rounded-3xl cursor-pointer  hover:border-gray-400 ">
                    <div className="w-[220px] mx-2 ">
                      <h2 className="font-bold my-3">{item?.name}</h2>
                      <p id="textItemDesc">{item.itemDesc}</p>
                      <p className="font-bold">AED {item.price}</p>
                    </div>
                    <div className="flex flex-col items-center mx-2 w-[200px] ">
                      <img
                        src={IMG_URL + item.image}
                        alt={item.name}
                        className="w-[150px] h-[90px] mx-3"
                      />
                      <button
                        onClick={() => handleAddBtn(item.modifiers)}
                        className="bg-white border-2    hover:cursor-pointer hover:scale-[1.2] duration-500 text-red-400 border-red-400 hover:text-red-600 hover:border-red-600 px-6 rounded-xl relative -top-4"
                      >
                        {" "}
                        + Add{" "}
                      </button>
                    </div>
                  </div>
                )
              
              )}
            </div>
          </div>
        ))}
      </div>
        
        </div>
      
    </div>
  );
};

export default Card;
