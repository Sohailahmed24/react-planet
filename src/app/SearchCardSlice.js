import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchSearchCardApi from "../api/fetchSearchCardApi";

const initialState={
    status:"idle",
    initialObj:{},
    error:null
}

 export const fetchSearchCard=createAsyncThunk(
    "FetchSearchCard",
    async(quary,{rejectWithValue})=>{
        try{
          const {data} =await fetchSearchCardApi(quary)  
             return data
        }catch(err){
            console.log(err)
            return rejectWithValue(err.message)
        }
    }
)

export const SearchCardSlice=createSlice({
    name:"SearchCard",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchSearchCard.pending,(state,action)=>{
             
             state.status="loading"
        })
        .addCase(fetchSearchCard.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.initialObj=action.payload
        })
        .addCase(fetchSearchCard.rejected,(state,action)=>{
            state.status="failed",
            state.error=action.payload
       })
    }
})


export default SearchCardSlice.reducer