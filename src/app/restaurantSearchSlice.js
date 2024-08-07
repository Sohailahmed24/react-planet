import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restaurantSearchFetchAPI } from "../api/resatarantSearchFetchAPI";

initialState={
    status:"idle",
    restaurantSearchObj:{},
    error:null
}


export const fetchSearchData=createAsyncThunk(
    "restaurant/fetchRestaurantSearch",
    async(_,{rejectWithValue})=>{
      try{
        const {data}=await restaurantSearchFetchAPI()
        
        return data
      }
      catch(error){
        return rejectWithValue(error.message)
      }
    }
  

)
 export const restaurantSearchSlice=createSlice({
    name:"restaurantSearch",
    initialState,
    extraReducers:(bulider)=>{
        bulider
        .addCase(fetchSearchData.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchSearchData.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.restaurantSearchObj=action.payload
           
        })
        .addCase(fetchSearchData.rejected,(state,action)=>{
            state.status="failed",
            state.error=action.payload
        })
    }
 })

 export default restaurantSearchSlice.reducer