import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchRestaurant } from "../api/fetchRestaurant"



const initialState={
    status:"idle",
    initialObj:{},
    error:null
}

export const fetchAsync=createAsyncThunk(
    "restaurants/fetchRestaurant",
    async (_,{rejectWithValue})=>{
       try {
        const {data}=await fetchRestaurant()
        
        return data
       } catch (error) {
          return rejectWithValue(error.message)
       }
    }
)
export const restaurantSlice=createSlice({
    name:"restaurants",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchAsync.fulfilled,(state,action)=>{
          
            state.status="succeeded"
                 state.initialObj =action.payload
        })
        .addCase(fetchAsync.rejected,(state,action)=>{
            state.status="failed",
            state.error=action.payload
        })
       
    }
})

export default restaurantSlice.reducer