import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRestaurantCard } from "../api/fetchRestaurantCard";


export const initialState={
    card:[] ,
    status:"idle",
    error:null
}



export const cardAsync= createAsyncThunk(
    "cart/fetchitem",
    async(outletCode,{rejectWithValue})=>{
     try{
        const {data}=await fetchRestaurantCard(outletCode);
        
        return data
     }
     catch(error){
         
        return rejectWithValue(error.message)
     }
    }
)





export const cardSlice= createSlice({
    name:"cart",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(cardAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(cardAsync.fulfilled,(state,action)=>{
            state.status="succeeded",
            state.card=action.payload
        }
        )
        .addCase(cardAsync.rejected,(state,action)=>{
            state.status="failed",
            state.error=action.payload
        })
    }
})

export default cardSlice.reducer