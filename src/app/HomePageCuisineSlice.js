import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  PageCuisineAPI } from "../api/HomePageCuisineAPI";

const initialState={
    status:"idle",
    initialObj:{},
    error:null
}



export  const fetchHomePageCuisine=createAsyncThunk(
    "restaurant/homePageCuisine",
    async(url,{rejectWithValue})=>{
       try{
       
        const {data} = await  PageCuisineAPI(url);
      
       return data
       }
       catch(error){
        return rejectWithValue(error.message)
       }
    }
)


export const HomePageCuisineSlice=createSlice({
    name:"homePageCuisine",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchHomePageCuisine.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchHomePageCuisine.fulfilled,(state,action)=>{
            state.status="succeeded",
          state.initialObj=action.payload
        })
        .addCase(fetchHomePageCuisine.rejected,(state,action)=>{
            state.status="failed",
             state.error=action.payload
        })
    }
})

export default HomePageCuisineSlice.reducer