

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { fetchNavFacets } from "../app/navSearchFacetsSlice";
import { fetchSearchPostData } from "../app/restaurantSearchPost";
import { useCookies } from "react-cookie";

const NavSearchFacets = () => {
  const [filters, setFilters] = useState({
    selectedCuisines: [],
    selectedSort: { by: "popularity", direction: "desc" },
    selectedDiet: [],
  }); 
  const [displayLimit, setDisplayLimit] = useState(10);
  const [showAll, setShowAll] = useState(false);
  const [cookies, setCookie] = useCookies(["selectedFilters"]) ;
  const [loading, setLoading] = useState(true);
 

  const {initialObj:facetsData ,status:status} = useSelector((state) => state.NavSearchFacetsData);
   
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cuisineData = useMemo(() => {
    return facetsData?.facets?.find((facet) => facet.code === "cuisines")?.data || [];
  }, [facetsData]);

  const handleDisplayLimit = useCallback(() => {
    setDisplayedCuisines(cuisineData.slice(0, displayLimit));
  }, [cuisineData, displayLimit]);

  const [displayedCuisines, setDisplayedCuisines] = useState(cuisineData.slice(0, displayLimit));

  useEffect(() => {
    handleDisplayLimit();
    
  }, [cuisineData, handleDisplayLimit]);
 
  useEffect(() => {
    dispatch(fetchNavFacets());
    
  }, [dispatch]);
  useEffect(()=>{
    if(status === "success"){
      setLoading(false)
    }
  },[status])

  useEffect(() => {
    dispatch(fetchSearchPostData(filters));
  }, [dispatch, filters]);

  const updateSearchParams = useCallback((cuisines, diet, sort) => {
    const searchParams = new URLSearchParams();

    if (cuisines.length > 0) {
      searchParams.set("cuisines", cuisines.join(","));
    }
    if (diet.length > 0) {
      searchParams.set("diet", diet.join(","));
    }
    if (sort) {
      searchParams.set("sort", `${sort.by},${sort.direction}`);
    }

    setCookie("selectedFilters", { cuisines, diet, sort }, { path: "/" });

    if (cuisines.length === 0 && diet.length === 0 && sort.by === "popularity") {
      navigate("/");
    } else {
      navigate({
        pathname: "/filterRestaurant",
        search: `?${searchParams.toString()}`,
      });
    }
  }, [navigate, setCookie]);

  const handleCuisineChange = useCallback((cuisine) => {
    setFilters((prevFilters) => {
      const updatedCuisines = prevFilters.selectedCuisines.includes(cuisine)
        ? prevFilters.selectedCuisines.filter((c) => c !== cuisine)
        : [...prevFilters.selectedCuisines, cuisine];

      updateSearchParams(updatedCuisines, prevFilters.selectedDiet, prevFilters.selectedSort);
      return { ...prevFilters, selectedCuisines: updatedCuisines };
    });
  }, [updateSearchParams]);

  const handleSortChange = useCallback((e) => {
    const sortBy = e.target.value;
    const sortDirection = sortBy === "delivery_time" || sortBy === "price" ? "asc" : "desc";
    const updatedSort = { by: sortBy, direction: sortDirection };

    setFilters((prevFilters) => {
      updateSearchParams(prevFilters.selectedCuisines, prevFilters.selectedDiet, updatedSort);
      return { ...prevFilters, selectedSort: updatedSort };
    });
  }, [updateSearchParams]);

  const handleDietChange = useCallback((diet) => {
    setFilters((prevFilters) => {
      const updatedDiet = prevFilters.selectedDiet.includes(diet)
        ? prevFilters.selectedDiet.filter((d) => d !== diet)
        : [...prevFilters.selectedDiet, diet];

      updateSearchParams(prevFilters.selectedCuisines, updatedDiet, prevFilters.selectedSort);
      return { ...prevFilters, selectedDiet: updatedDiet };
    });
  }, [updateSearchParams]);

  const showMoreCuisines = () => {
    setDisplayedCuisines(cuisineData);
    setShowAll(true);
  };

  const showLessCuisines = () => {
    setDisplayedCuisines(cuisineData.slice(0, 10));
    setShowAll(false);
  };

  return (
   (!loading) && (
      <>
        <div>
          <h1 className="font-bold">sort</h1>
          <div className="flex">
            <div className="mx-3">
              <input
                type="radio"
                name="sort"
                value="popularity"
                onClick={handleSortChange}
                checked={filters.selectedSort.by === "popularity"}
              />
            </div>
            <label>Popularity</label>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input
                type="radio"
                name="sort"
                value="delivery_time"
                onClick={handleSortChange}
                checked={filters.selectedSort.by === "delivery_time"}
              />
            </div>
            <label>Delivery Time</label>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input
                type="radio"
                name="sort"
                value="price"
                onClick={handleSortChange }
                checked={filters.selectedSort.by === "price"}
              />
            </div>
            <label  >Price</label>
          </div>
        </div>
        <div>
             <h1 className="font-bold">Cuisines</h1>
          {displayedCuisines.map((cuisine) => (
            <div key={cuisine.code} className="flex my-3 justify-items-center">
              <div className="mx-3">
                <input
                  type="checkbox"
                  value={cuisine.code}
                  checked={filters.selectedCuisines.includes(cuisine.code)}
                  onChange={() => handleCuisineChange(cuisine.code)}
                />
              </div>
              <label>{cuisine.name}</label>
            </div>
          ))}
          <div>
            {showAll ? (
              <button className="border-b-4 border-rose-700 text-rose-700 px-5" onClick={showLessCuisines}>
                Less
              </button>
            ) : (
              <button className="border-b-4 border-rose-700 text-rose-700 px-5" onClick={showMoreCuisines}>
                More
              </button>
            )}
          </div>
        </div>
        <div>
          <h1 className="font-bold">Dietary Restrictions</h1>
          {facetsData?.facets
            ?.filter((facet) => facet.code === "dietary_restrictions")
            ?.map((facet) =>
              facet.data.map((diet) => (
                <div key={diet.code} className="flex">
                  <div className="mx-3">
                    <input
                      type="checkbox"
                      checked={filters.selectedDiet.includes(diet.code)}
                      value={diet.code}
                      onClick={() => handleDietChange(diet.code)}
                    />
                  </div>
                  <label>{diet.name}</label>
                </div>
              ))
            )}
        </div>
      </>
    )
  );
};

export default NavSearchFacets;



