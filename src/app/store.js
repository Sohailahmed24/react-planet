import { configureStore } from "@reduxjs/toolkit";
import restaurantSearchSlice from "./restaurantSearchSlice";
import restaurantSearchPost from "./restaurantSearchPost";
import navSearchFacetsSlice from "./navSearchFacetsSlice";
import HomePageCuisineSlice from "./HomePageCuisineSlice";
import cardSliceReducer from "./cardSlice";
import restaurantSlice from "../app/restaurantSlice";
import userSlice from "./userSlice";
import SearchCardSlice from "./SearchCardSlice";




export const store = configureStore({
  reducer: {
    restaurants: restaurantSlice, 
    card: cardSliceReducer,           
    restaurantSearch: restaurantSearchSlice,
    PostSearchData: restaurantSearchPost,
    NavSearchFacetsData:navSearchFacetsSlice  ,   
    HomePageCuisine:HomePageCuisineSlice,
    user:userSlice,
    SearchCard:SearchCardSlice
  },
});
