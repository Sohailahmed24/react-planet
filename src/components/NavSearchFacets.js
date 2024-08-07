/* import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { fetchNavFacets } from '../app/navSearchFacetsSlice';
import { fetchSearchPostData } from '../app/restaurantSearchPost';

const NavSearchFacets = React.memo(() => {
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState([]);
    const [sortParam, setSortParam] = useState({});
    const [select, setSelect] = useState({
      selectedCuisines: [],
      selectedSort: { by: "popularity", dir: "desc" },
      selectedDiet: []
    });
  
    const [debouncedSelect] = useDebounce(select, 300); // Debounce the `select` state
  
    const facetsData = useSelector((state) => state.NavSearchFacetsData.initialObj);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // Fetch facets data on component mount
    useEffect(() => {
      console.log('Fetching facets data');
      dispatch(fetchNavFacets());
    }, [dispatch]);
  
    // Handle API fetch based on debounced select
    useEffect(() => {
      console.log('Debounced select:', debouncedSelect);
      if (debouncedSelect) {
        dispatch(fetchSearchPostData(debouncedSelect));
      }
    }, [debouncedSelect, dispatch]);
  
    // Handle navigation based on selectedCuisines, selectedDiet, and sortParam
    useEffect(() => {
      const searchParam = {
        cuisines: selectedCuisines.join(","),
        ...(selectedDiet.length > 0 && { diet: selectedDiet.join(",") }),
        ...(new URLSearchParams(sortParam).toString() && { sort: new URLSearchParams(sortParam).toString() }),
      };
  
      if (selectedCuisines.length === 0 && selectedDiet.length === 0) {
        navigate("/");
      } else {
        navigate({
          pathname: "/filterRestaurant",
          search: `?${createSearchParams(searchParam).toString()}`,
        });
      }
    }, [selectedCuisines, selectedDiet, sortParam, navigate]);
  
    // Handle checkbox change
    const handleCheckBox = useCallback((cuisine) => {
      setSelectedCuisines((prevCuisines) => {
        const updatedCuisines = prevCuisines.includes(cuisine)
          ? prevCuisines.filter((c) => c !== cuisine)
          : [...prevCuisines, cuisine];
  
        setSelect((prevState) => ({
          ...prevState,
          selectedCuisines: updatedCuisines
        }));
  
        return updatedCuisines;
      });
    }, []);
  
    // Define other handlers if needed
    const handleDietChange = useCallback((diet) => {
      setSelectedDiet((prevDiet) => {
        const updatedDiet = prevDiet.includes(diet)
          ? prevDiet.filter((d) => d !== diet)
          : [...prevDiet, diet];
  
        setSelect((prevState) => ({
          ...prevState,
          selectedDiet: updatedDiet
        }));
  
        return updatedDiet;
      });
    }, []);
    const handleSortChange = useCallback((sort) => {
      
      setSortParam(sort);
      setSelect((prevState) => ({
        ...prevState,
        selectedSort: sort
      }));
    }, []);
  
    return (
      <div>
        <div>
          <h1>Sort</h1>
          <div className="flex">
            <div className="mx-3">
              <input type="radio" name="sort" value="popularity" onChange={handleSortChange} />
            </div>
            <div>
              <label>Popularity</label>
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input type="radio" name="sort" value="delivery_time" onChange={handleSortChange} />
            </div>
            <div>
              <label>Delivery Time</label>
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input type="radio" name="sort" value="price" onChange={handleSortChange} /> 
            </div>
            <div>
              <label>Price</label>
            </div>
          </div>
        </div>
        <div>
          <h1>Cuisines</h1>
          {facetsData?.facets
            ?.filter((facet) => facet.code === "cuisines")?.[0]
            ?.data?.map((data) => (
              <div key={data.code} className="flex my-3 justify-items-center">
                <div className="mx-3">
                  <input
                    type="checkbox"
                    value={data.code}
                    checked={selectedCuisines.includes(data.code)}
                    onChange={() => handleCheckBox(data.code)}
                  />
                </div>
                <div>
                  <label>{data.name}</label>
                </div>
              </div>
            ))}
        </div>
        <div>
          <div className="my-8">
            <h1>Dietary Restrictions</h1>
          </div>
          <div>
            {
              // Map through dietary restrictions
              facetsData?.facets?.filter(item => item.code === "dietary_restrictions")?.map(item => item.data.map(item =>
                <div className="flex" key={item.code}>
                  <div className="mx-3">
                   <input type="checkbox" checked={selectedDiet.includes(item.code)} value={item.code} onChange={() => handleDietChange(item.code)} /> 
                  </div>
                  <div>
                    <label>{item.name}</label>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
  
)
export default NavSearchFacets;
 */

/* 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchNavFacets } from "../app/navSearchFacetsSlice";
import { fetchSearchPostData } from "../app/restaurantSearchPost";

const NavSearchFacets = () => {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [sortParam, setSortParam] = useState({ by: "popularity", dir: "desc" });
  const [select, setSelect] = useState({
    selectedCuisines: [],
    selectedSort: { by: "popularity", dir: "desc" },
    selectedDiet: [],
  });

  const facetsData = useSelector((state) => state.NavSearchFacetsData.initialObj);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNavFacets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSearchPostData(select));
  }, [dispatch, select]);

  const handleCheckBox = (cuisine) => {
    let updatedCuisines;
    if (selectedCuisines.includes(cuisine)) {
      updatedCuisines = selectedCuisines.filter((c) => c !== cuisine);
    } else {
      updatedCuisines = [...selectedCuisines, cuisine];
    }

    const sortParamsString = new URLSearchParams(sortParam).toString();
    const searchParam = {
      cuisines: updatedCuisines.join(","),
      ...(select.selectedDiet.length > 0 && { diet: select.selectedDiet.join(",") }),
      ...(sortParamsString && { sort: sortParamsString }),
    };

    navigate({
      pathname: "/staurant",
      search: `?${createSearchParams(searchParam).toString()}`,
    });

    setSelectedCuisines(updatedCuisines);
    setSelect((prevState) => ({ ...prevState, selectedCuisines: updatedCuisines }));
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;
    const sortDirection = sortBy === "delivery_time" || sortBy === "price" ? "asc" : "desc";
    const updateSort = {
      by: sortBy,
      dir: sortDirection,
    };
    setSortParam(updateSort);
    setSelect((prevState) => ({ ...prevState, selectedSort: updateSort }));

    navigate({
      pathname: "/filterRestaurant",
      search: `?${createSearchParams({
        cuisines: select.selectedCuisines.join(","),
        diet: select.selectedDiet.join(","),
        sort: new URLSearchParams(updateSort).toString(),
      })}`,
    });
  };

  const handleSelectedDiet = (diet) => {
    let updatedDiet;
    if (selectedDiet.includes(diet)) {
      updatedDiet = selectedDiet.filter((d) => d !== diet);
    } else {
      updatedDiet = [...selectedDiet, diet];
    }

    const searchParam = {
      cuisines: selectedCuisines.join(","),
      diet: updatedDiet.join(","),
      ...(new URLSearchParams(sortParam).toString() && { sort: new URLSearchParams(sortParam).toString() }),
    };

    navigate({
      pathname: "/filterRestaurant",
      search: `?${createSearchParams(searchParam).toString()}`,
    });

    setSelectedDiet(updatedDiet);
    setSelect((prevState) => ({ ...prevState, selectedDiet: updatedDiet }));
  };

  return (
    <>
      <div>
        <div>
          <h1>Sort</h1>
        </div>
        <div>
          <div className="flex">
            <div className="mx-3">
              <input type="radio" name="sort" value="popularity" onClick={handleSort} />
            </div>
            <div>
              <label>Popularity</label>
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input type="radio" name="sort" value="delivery_time" onClick={handleSort} />
            </div>
            <div>
              <label>Delivery Time</label>
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input type="radio" name="sort" value="price" onClick={handleSort} />
            </div>
            <div>
              <label>Price</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Cuisines</h1>
      </div>
      <div>
        {facetsData?.facets
          ?.filter((facet) => facet.code === "cuisines")[0]
          ?.data?.map((data) => (
            <div key={data.code} className="flex my-3 justify-items-center">
              <div className="mx-3">
                <input
                  type="checkbox"
                  value={data.code}
                  checked={selectedCuisines.includes(data.code)}
                  onChange={() => handleCheckBox(data.code)}
                />
              </div>
              <div>
                <label>{data.name}</label>
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="my-8">
          <h1>Dietary Restrictions</h1>
        </div>
        <div>
          {facetsData?.facets
            ?.filter((item) => item.code === "dietary_restrictions")
            ?.map((item) =>
              item.data.map((diet) => (
                <div key={diet.code} className="flex">
                  <div className="mx-3">
                    <input
                      type="checkbox"
                      checked={selectedDiet.includes(diet.code)}
                      value={diet.code}
                      onClick={() => handleSelectedDiet(diet.code)}
                    />
                  </div>
                  <div>
                    <label>{diet.name}</label>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
    </>
  );
};

export default NavSearchFacets; */


/* import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchNavFacets } from "../app/navSearchFacetsSlice";
import { fetchSearchPostData } from "../app/restaurantSearchPost";

const NavSearchFacets = () => {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [sortParam, setSortParam] = useState({ by: "popularity", dir: "desc" });
  const [select, setSelect] = useState({
    selectedCuisines: [],
    selectedSort: { by: "popularity", dir: "desc" },
    selectedDiet: [],
  });

  const facetsData = useSelector((state) => state.NavSearchFacetsData.initialObj);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNavFacets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSearchPostData(select));
  }, [dispatch, select]);

  const updateSearchParams = useCallback((updatedCuisines, updatedDiet, updatedSort) => {
    const searchParams = new URLSearchParams();

    if (updatedCuisines.length > 0) {
      searchParams.set('cuisines', updatedCuisines.join(","));
    }
    if (updatedDiet.length > 0) {
      searchParams.set('diet', updatedDiet.join(","));
    }
    if (updatedSort) {
      searchParams.set('sort', `${updatedSort.by},${updatedSort.dir}`);
    }

    navigate({
      pathname: "/filterRestaurant",
      search: `?${searchParams.toString()}`,
    });
  }, [navigate]);

  const handleCheckBox = useCallback((cuisine) => {
    setSelectedCuisines((prevSelectedCuisines) => {
      const updatedCuisines = prevSelectedCuisines.includes(cuisine)
        ? prevSelectedCuisines.filter((c) => c !== cuisine)
        : [...prevSelectedCuisines, cuisine];

      updateSearchParams(updatedCuisines, select.selectedDiet, sortParam);
      setSelect((prevState) => ({ ...prevState, selectedCuisines: updatedCuisines }));
      return updatedCuisines;
    });
  }, [updateSearchParams, select.selectedDiet, sortParam]);

  const handleSort = useCallback((e) => {
    const sortBy = e.target.value;
    const sortDirection = sortBy === "delivery_time" || sortBy === "price" ? "asc" : "desc";
    const updateSort = { by: sortBy, dir: sortDirection };

    setSortParam(updateSort);
    setSelect((prevState) => ({ ...prevState, selectedSort: updateSort }));
    updateSearchParams(select.selectedCuisines, select.selectedDiet, updateSort);
  }, [updateSearchParams, select.selectedCuisines, select.selectedDiet]);

  const handleSelectedDiet = useCallback((diet) => {
    setSelectedDiet((prevSelectedDiet) => {
      const updatedDiet = prevSelectedDiet.includes(diet)
        ? prevSelectedDiet.filter((d) => d !== diet)
        : [...prevSelectedDiet, diet];

      updateSearchParams(select.selectedCuisines, updatedDiet, sortParam);
      setSelect((prevState) => ({ ...prevState, selectedDiet: updatedDiet }));
      return updatedDiet;
    });
  }, [updateSearchParams, select.selectedCuisines, sortParam]);

  return (
    <>
      <div>
        <div>
          <h1>Sort</h1>
        </div>
        <div>
          <div className="flex">
            <div className="mx-3">
              <input type="radio" name="sort" value="popularity" onClick={handleSort} />
            </div>
            <div>
              <label>Popularity</label>
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input type="radio" name="sort" value="delivery_time" onClick={handleSort} />
            </div>
            <div>
              <label>Delivery Time</label>
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input type="radio" name="sort" value="price" onClick={handleSort} />
            </div>
            <div>
              <label>Price</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Cuisines</h1>
      </div>
      <div>
        {facetsData?.facets
          ?.filter((facet) => facet.code === "cuisines")[0]
          ?.data?.map((data) => (
            <div key={data.code} className="flex my-3 justify-items-center">
              <div className="mx-3">
                <input
                  type="checkbox"
                  value={data.code}
                  checked={selectedCuisines.includes(data.code)}
                  onChange={() => handleCheckBox(data.code)}
                />
              </div>
              <div>
                <label>{data.name}</label>
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="my-8">
          <h1>Dietary Restrictions</h1>
        </div>
        <div>
          {facetsData?.facets
            ?.filter((item) => item.code === "dietary_restrictions")
            ?.map((item) =>
              item.data.map((diet) => (
                <div key={diet.code} className="flex">
                  <div className="mx-3">
                    <input
                      type="checkbox"
                      checked={selectedDiet.includes(diet.code)}
                      value={diet.code}
                      onClick={() => handleSelectedDiet(diet.code)}
                    />
                  </div>
                  <div>
                    <label>{diet.name}</label>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
    </>
  );
};

export default NavSearchFacets; */

/*  import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchNavFacets } from "../app/navSearchFacetsSlice";
import { fetchSearchPostData } from "../app/restaurantSearchPost";

const NavSearchFacets = () => {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [sortParam, setSortParam] = useState({ by: "popularity", dir: "desc" });
  const [select, setSelect] = useState({
    selectedCuisines: [],
    selectedSort: { by: "popularity", dir: "desc" },
    selectedDiet: [],
  });

  const facetsData = useSelector((state) => state.NavSearchFacetsData.initialObj);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNavFacets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSearchPostData(select));
  }, [dispatch, select]);

  const updateSearchParams = useCallback((updatedCuisines, updatedDiet, updatedSort) => {
    if (updatedCuisines.length === 0 && updatedDiet.length === 0) {
      navigate("/");
    } else {
      const searchParams = new URLSearchParams();

      if (updatedCuisines.length > 0) {
        searchParams.set('cuisines', updatedCuisines.join(","));
      }
      if (updatedDiet.length > 0) {
        searchParams.set('diet', updatedDiet.join(","));
      }
      if (updatedSort) {
        searchParams.set('sort', `${updatedSort.by},${updatedSort.dir}`);
      }

      navigate({
        pathname: "/filterRestaurant",
        search: `?${searchParams.toString()}`,
      });
    }
  }, [navigate]);

  const handleCheckBox = useCallback((cuisine) => {
    setSelectedCuisines((prevSelectedCuisines) => {
      const updatedCuisines = prevSelectedCuisines.includes(cuisine)
        ? prevSelectedCuisines.filter((c) => c !== cuisine)
        : [...prevSelectedCuisines, cuisine];

      updateSearchParams(updatedCuisines, select.selectedDiet, sortParam);
      setSelect((prevState) => ({ ...prevState, selectedCuisines: updatedCuisines }));
      return updatedCuisines;
    });
  }, [updateSearchParams, select.selectedDiet, sortParam]);

  const handleSort = useCallback((e) => {
    const sortBy = e.target.value;
    const sortDirection = sortBy === "delivery_time" || sortBy === "price" ? "asc" : "desc";
    const updateSort = { by: sortBy, dir: sortDirection };

    setSortParam(updateSort);
    setSelect((prevState) => ({ ...prevState, selectedSort: updateSort }));
    updateSearchParams(select.selectedCuisines, select.selectedDiet, updateSort);
  }, [updateSearchParams, select.selectedCuisines, select.selectedDiet]);

  const handleSelectedDiet = useCallback((diet) => {
    setSelectedDiet((prevSelectedDiet) => {
      const updatedDiet = prevSelectedDiet.includes(diet)
        ? prevSelectedDiet.filter((d) => d !== diet)
        : [...prevSelectedDiet, diet];

      updateSearchParams(select.selectedCuisines, updatedDiet, sortParam);
      setSelect((prevState) => ({ ...prevState, selectedDiet: updatedDiet }));
      return updatedDiet;
    });
  }, [updateSearchParams, select.selectedCuisines, sortParam]);

  return (
    <>
      <div>
        <div>
          <h1>Sort</h1>
        </div>
        <div>
          <div className="flex">
            <div className="mx-3">
              <input
                type="radio"
                name="sort"
                value="popularity"
                onClick={handleSort}
                checked={sortParam.by === "popularity"}
              />
            </div>
            <div>
              <label>Popularity</label>
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input
                type="radio"
                name="sort"
                value="delivery_time"
                onClick={handleSort}
                checked={sortParam.by === "delivery_time"}
              />
            </div>
            <div>
              <label>Delivery Time</label>
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input
                type="radio"
                name="sort"
                value="price"
                onClick={handleSort}
                checked={sortParam.by === "price"}
              />
            </div>
            <div>
              <label>Price</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Cuisines</h1>
      </div>
      <div>
        {facetsData?.facets
          ?.filter((facet) => facet.code === "cuisines")[0]
          ?.data?.map((data) => (
            <div key={data.code} className="flex my-3 justify-items-center">
              <div className="mx-3">
                <input
                  type="checkbox"
                  value={data.code}
                  checked={selectedCuisines.includes(data.code)}
                  onChange={() => handleCheckBox(data.code)}
                />
              </div>
              <div>
                <label>{data.name}</label>
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="my-8">
          <h1>Dietary Restrictions</h1>
        </div>
        <div>
          {facetsData?.facets
            ?.filter((item) => item.code === "dietary_restrictions")
            ?.map((item) =>
              item.data.map((diet) => (
                <div key={diet.code} className="flex">
                  <div className="mx-3">
                    <input
                      type="checkbox"
                      checked={selectedDiet.includes(diet.code)}
                      value={diet.code}
                      onClick={() => handleSelectedDiet(diet.code)}
                    />
                  </div>
                  <div>
                    <label>{diet.name}</label>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
    </>
  );
};

export default NavSearchFacets;  */


/*  import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchNavFacets } from "../app/navSearchFacetsSlice";
import { fetchSearchPostData } from "../app/restaurantSearchPost";

const NavSearchFacets = () => {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [sortParam, setSortParam] = useState({ by: "popularity", dir: "desc" });
  const [select, setSelect] = useState({
    selectedCuisines: [],
    selectedSort: { by: "popularity", dir: "desc" },
    selectedDiet: [],
  });

  const facetsData = useSelector((state) => state.NavSearchFacetsData.initialObj);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNavFacets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSearchPostData(select));
  }, [dispatch, select]);

  const updateSearchParams = useCallback((updatedCuisines, updatedDiet, updatedSort) => {
    if (updatedCuisines.length === 0 && updatedDiet.length === 0) {
      navigate("/");
    } else {
      const searchParams = new URLSearchParams();

      if (updatedCuisines.length > 0) {
        searchParams.set("cuisines", updatedCuisines.join(","));
      }
      if (updatedDiet.length > 0) {
        searchParams.set("diet", updatedDiet.join(","));
      }
      if (updatedSort) {
        searchParams.set("sort", `${updatedSort.by},${updatedSort.dir}`);
      }

      navigate({
        pathname: "/filterRestaurant",
        search: `?${searchParams.toString()}`,
      });
    }
  }, [navigate]);

  const handleCheckBox = useCallback((cuisine) => {
    setSelectedCuisines((prevSelectedCuisines) => {
      const updatedCuisines = prevSelectedCuisines.includes(cuisine)
        ? prevSelectedCuisines.filter((c) => c !== cuisine)
        : [...prevSelectedCuisines, cuisine];

      updateSearchParams(updatedCuisines, select.selectedDiet, sortParam);
      setSelect((prevState) => ({ ...prevState, selectedCuisines: updatedCuisines }));
      return updatedCuisines;
    });
  }, [updateSearchParams, select.selectedDiet, sortParam]);

  const handleSort = useCallback((e) => {
    const sortBy = e.target.value;
    const sortDirection = sortBy === "delivery_time" || sortBy === "price" ? "asc" : "desc";
    const updateSort = { by: sortBy, dir: sortDirection };

    setSortParam(updateSort);
    setSelect((prevState) => ({ ...prevState, selectedSort: updateSort }));
    updateSearchParams(select.selectedCuisines, select.selectedDiet, updateSort);
  }, [updateSearchParams, select.selectedCuisines, select.selectedDiet]);

  const handleSelectedDiet = useCallback((diet) => {
    setSelectedDiet((prevSelectedDiet) => {
      const updatedDiet = prevSelectedDiet.includes(diet)
        ? prevSelectedDiet.filter((d) => d !== diet)
        : [...prevSelectedDiet, diet];

      updateSearchParams(select.selectedCuisines, updatedDiet, sortParam);
      setSelect((prevState) => ({ ...prevState, selectedDiet: updatedDiet }));
      return updatedDiet;
    });
  }, [updateSearchParams, select.selectedCuisines, sortParam]);

  return (
    <>
      <div>
        <div>
          <h1>Sort</h1>
        </div>
        <div>
          <div className="flex">
            <div className="mx-3">
              <input
                type="radio"
                name="sort"
                value="popularity"
                onClick={handleSort}
                checked={sortParam.by === "popularity"}
              />
            </div>
            <div>
              <label>Popularity</label>
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input
                type="radio"
                name="sort"
                value="delivery_time"
                onClick={handleSort}
                checked={sortParam.by === "delivery_time"}
              />
            </div>
            <div>
              <label>Delivery Time</label>
            </div>
          </div>
          <div className="flex">
            <div className="mx-3">
              <input
                type="radio"
                name="sort"
                value="price"
                onClick={handleSort}
                checked={sortParam.by === "price"}
              />
            </div>
            <div>
              <label>Price</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Cuisines</h1>
      </div>
      <div>
        {facetsData?.facets
          ?.filter((facet) => facet.code === "cuisines")[0]
          ?.data?.map((data) => (
            <div key={data.code} className="flex my-3 justify-items-center">
              <div className="mx-3">
                <input
                  type="checkbox"
                  value={data.code}
                  checked={selectedCuisines.includes(data.code)}
                  onChange={() => handleCheckBox(data.code)}
                />
              </div>
              <div>
                <label>{data.name}</label>
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="my-8">
          <h1>Dietary Restrictions</h1>
        </div>
        <div>
          {facetsData?.facets
            ?.filter((item) => item.code === "dietary_restrictions")
            ?.map((item) =>
              item.data.map((diet) => (
                <div key={diet.code} className="flex">
                  <div className="mx-3">
                    <input
                      type="checkbox"
                      checked={selectedDiet.includes(diet.code)}
                      value={diet.code}
                      onClick={() => handleSelectedDiet(diet.code)}
                    />
                  </div>
                  <div>
                    <label>{diet.name}</label>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
    </>
  );
};

export default NavSearchFacets;  */



/* import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchNavFacets } from "../app/navSearchFacetsSlice";
import { fetchSearchPostData } from "../app/restaurantSearchPost"; */

// const NavSearchFacets = () => {
/*   const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState([]);
  const [sortParam, setSortParam] = useState({ by: "popularity", dir: "desc" });
  const [select, setSelect] = useState({
    selectedCuisines: [],
    selectedSort: { by: "popularity", dir: "desc" },
    selectedDiet: [],
  });

 
  const facetsData = useSelector((state) => state.NavSearchFacetsData.initialObj);
  const dispatch = useDispatch();
  const navigate = useNavigate();


   const  datafilter1=facetsData?.facets
   ?.filter((facet) => facet.code === "cuisines")[0]
   ?.data
   const [showItem,setShowItem]=useState(5)
   const [datafilter,setDatafilter]=useState([])
   const [moreHide,setMoreHide]=useState(false)

   const handleSlice=()=>{
    if(datafilter1){
    setDatafilter(datafilter1.slice(0,showItem))
    }
   }
  
   useEffect(()=>{
     
     handleSlice()
     
   },[datafilter1])
   
 

  const handleMore=()=>{

   setDatafilter(datafilter1)
    console.log("more calling")
    setMoreHide(true)
    console.log(moreHide)
  }

 const handleless=()=>{
  setDatafilter(datafilter1.slice(0,showItem))
  setMoreHide(false)
 }



 


  useEffect(() => {
    dispatch(fetchNavFacets());
    console.log("NavSearchFacets useEffet 1 api call")
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSearchPostData(select));
    console.log("NavSearchFacets useEffet 2 api call")
  }, [dispatch, select]);

  const updateSearchParams = useCallback((updatedCuisines, updatedDiet, updatedSort) => {
    const searchParams = new URLSearchParams();

    if (updatedCuisines.length > 0) {
      searchParams.set("cuisines", updatedCuisines.join(","));
    }
    if (updatedDiet.length > 0) {
      searchParams.set("diet", updatedDiet.join(","));
    }
    if (updatedSort) {
      searchParams.set("sort", `${updatedSort.by},${updatedSort.dir}`);
    }

    if (updatedCuisines.length === 0 && updatedDiet.length === 0 && updatedSort.by ==="popularity") {
      navigate("/");
    } else {
      navigate({
        pathname: "/filterRestaurant",
        search: `?${searchParams.toString()}`,
      });
    }
  }, [navigate]);

  const handleCheckBox = useCallback((cuisine) => {
    setSelectedCuisines((prevSelectedCuisines) => {
      const updatedCuisines = prevSelectedCuisines.includes(cuisine)
        ? prevSelectedCuisines.filter((c) => c !== cuisine)
        : [...prevSelectedCuisines, cuisine];

      updateSearchParams(updatedCuisines, selectedDiet, sortParam);
      setSelect((prevState) => ({ ...prevState, selectedCuisines: updatedCuisines }));
      return updatedCuisines;
    });
  }, [updateSearchParams, selectedDiet, sortParam]);

  const handleSort = useCallback((e) => {
    const sortBy = e.target.value;
    const sortDirection = sortBy === "delivery_time" || sortBy === "price" ? "asc" : "desc";
    const updateSort = { by: sortBy, dir: sortDirection };

    setSortParam(updateSort);
    setSelect((prevState) => ({ ...prevState, selectedSort: updateSort }));
    updateSearchParams(selectedCuisines, selectedDiet, updateSort);
  }, [updateSearchParams, selectedCuisines, selectedDiet]);

  const handleSelectedDiet = useCallback((diet) => {
    setSelectedDiet((prevSelectedDiet) => {
      const updatedDiet = prevSelectedDiet.includes(diet)
        ? prevSelectedDiet.filter((d) => d !== diet)
        : [...prevSelectedDiet, diet];

      updateSearchParams(selectedCuisines, updatedDiet, sortParam);
      setSelect((prevState) => ({ ...prevState, selectedDiet: updatedDiet }));
      return updatedDiet;
    });
  }, [updateSearchParams, selectedCuisines, sortParam]);

  return (
   (facetsData)&&(
    <>
    <div>
      { console.log("NavSearchFacets body call")}
      <div>
        <h1>Sort</h1>
      </div>
      <div>
        <div className="flex">
          <div className="mx-3">
            <input
              type="radio"
              name="sort"
              value="popularity"
              onClick={handleSort}
              checked={sortParam.by === "popularity"}
            />
          </div>
          <div>
            <label>Popularity</label>
          </div>
        </div>
        <div className="flex">
          <div className="mx-3">
            <input
              type="radio"
              name="sort"
              value="delivery_time"
              onClick={handleSort}
              checked={sortParam.by === "delivery_time"}
            />
          </div>
          <div>
            <label>Delivery Time</label>
          </div>
        </div>
        <div className="flex">
          <div className="mx-3">
            <input
              type="radio"
              name="sort"
              value="price"
              onClick={handleSort}
              checked={sortParam.by === "price"}
            />
          </div>
          <div>
            <label>Price</label>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1>Cuisines</h1>
    </div>
    <div> */
{/*       {facetsData?.facets
        ?.filter((facet) => facet.code === "cuisines")[0]
        ?.data?.map((data) => (
          <div key={data.code} className="flex my-3 justify-items-center">
            <div className="mx-3">
              <input
                type="checkbox"
                value={data.code}
                checked={selectedCuisines.includes(data.code)}
                onChange={() => handleCheckBox(data.code)}
              />
            </div>
            <div>
              <label>{data.name}</label>
            </div>
          </div>
        ))} */}
   {/*      {
          datafilter.map(data=>
            <div key={data.code} className="flex my-3 justify-items-center">
            <div className="mx-3">
              <input
                type="checkbox"
                value={data.code}
                checked={selectedCuisines.includes(data.code)}
                onChange={() => handleCheckBox(data.code)}
              />
            </div>
            <div>
              <label>{data.name}</label>
            </div>
          </div>
          )
        }
        <div  >
         {
          (moreHide)?<button className="border-b-4 border-rose-700 text-rose-700 px-5" onClick={handleless}>Less</button>: <button  className=" border-b-4 border-rose-700 text-rose-700 px-5" onClick={handleMore}>More</button>
         }
        </div>
    </div>
    <div>
      <div className="my-8">
        <h1>Dietary Restrictions</h1>
      </div>
      <div>
        {facetsData?.facets
          ?.filter((item) => item.code === "dietary_restrictions")
          ?.map((item) =>
            item.data.map((diet) => (
              <div key={diet.code} className="flex">
                <div className="mx-3">
                  <input
                    type="checkbox"
                    checked={selectedDiet.includes(diet.code)}
                    value={diet.code}
                    onClick={() => handleSelectedDiet(diet.code)}
                  />
                </div>
                <div>
                  <label>{diet.name}</label>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  </>
   )
  );
 }; */}

/* export default NavSearchFacets; */





import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
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



