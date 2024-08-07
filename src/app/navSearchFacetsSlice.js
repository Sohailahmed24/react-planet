import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restaurantSearchFetchAPI } from "../api/resatarantSearchFetchAPI";

export const initialState={
    status:"idle",
    initialObj:{},
    error:null
}

export const fetchNavFacets=createAsyncThunk(
    "restaurant/Facets",
  
        async (_,{rejectWithValue})=>{
            try {
                const {data}=await restaurantSearchFetchAPI()
               
                return data
            } catch (error) {
               return rejectWithValue(error.message)
            }
         }
        
    
)


export const navSearchFacetsSlice=createSlice({
    name:"SearchFacets",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchNavFacets.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchNavFacets.fulfilled,(state,action)=>{
            state.initialObj=action.payload,
            state.status="success"
        })
        .addCase(fetchNavFacets.rejected,(state,action)=>{
            state.status="failed",
            state.error=action.payload
        })
    }
})


export default navSearchFacetsSlice.reducer