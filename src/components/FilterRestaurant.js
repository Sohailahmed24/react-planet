import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { fetchSearchPostData } from "../app/restaurantSearchPost";

import RestaurantCard from "./RestaurantCard";
import useScrollerInfinte from "./useScrollerInfinte";

const FilterRestaurant = () => {
  const data = useSelector((state) => state.PostSearchData.initialObj);
  const cardDetails=useScrollerInfinte(data)
  
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
 
  const selectedCuisines = searchParams.get("cuisines")
    ? searchParams.get("cuisines").split(",")
    : [];

  const selectedDiet = searchParams.get("diet")
    ? searchParams.get("diet").split(",")
    : [];

  const sortParamString = searchParams.get("sort") || "";

  const selectedSort = Object.fromEntries(
    new URLSearchParams(sortParamString).entries()
  );
  
  useEffect(() => {
    dispatch(fetchSearchPostData(selectedCuisines, selectedDiet, selectedSort));
  }, []);

  return (
    <>
      <div>
        <h1 className="font-bold">Restaurant</h1>
      </div>
      <div className="flex flex-wrap m-4">
        {cardDetails?.map((item) => (
            <div key={item.outletCode} >

                       <Link to={`/outlet/${item.outletCode}`} key={item.restaurantCode} >
                                  <RestaurantCard   resData={item} />
                        </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default FilterRestaurant;
