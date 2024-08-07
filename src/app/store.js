import { configureStore } from "@reduxjs/toolkit";
import restarantReducer from "../app/restaurantSlice";
//import restaurantCardSlice from "./cardSlice";
import restaurantSearchSlice from "./restaurantSearchSlice";
import restaurantCheckBoxSearchSlice from "./restaurantCheckBoxSearchSlice";

import restaurantSearchPost from "./restaurantSearchPost";
import restaurantSearch2Slice from "./restaurantSearch2Slice";
import navSearchFacetsSlice from "./navSearchFacetsSlice";
import HomePageCuisineSlice from "./HomePageCuisineSlice";
import cardSliceReducer from "./cardSlice";
import restaurantSlice from "../app/restaurantSlice";
import userSlice from "./userSlice";
import SearchCardSlice from "./SearchCardSlice";




export const store = configureStore({
  reducer: {
    restaurants: restaurantSlice,  /* verify */
    card: cardSliceReducer,           /* verify */
    restaurantSearch: restaurantSearchSlice,
   // checkBoxSearch: restaurantCheckBoxSearchSlice,
   // Search: restaurantSearchSlice,     /* check once */
    PostSearchData: restaurantSearchPost,
   // NavSearchData:restaurantSearch2Slice,
    NavSearchFacetsData:navSearchFacetsSlice  ,   /* verify */
    HomePageCuisine:HomePageCuisineSlice,
    user:userSlice,
    SearchCard:SearchCardSlice
  },
});
