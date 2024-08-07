/* import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPostAPI, fetchSearchAPI } from "../api/fetchSeachAPI";

const initialState={
    initialObj:{}
}

export const fetchSearchPostData= createAsyncThunk(
    "restaurant/fetchrestaurantSearchData",
   async(select)=>{
      const data=await fetchSearchAPI(select)
      console.log(data)
      return data
    }
)

export const searchDataSlice=createSlice({
    name:"postdata",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchSearchPostData.fulfilled,(state,action)=>{
            state.initialObj=action.payload
            console.log(action.payload)
        })
    }
})


export default searchDataSlice.reducer */




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSearchAPI } from "../api/fetchSeachAPI";

const initialState = {
  initialObj: {},
  status: 'idle', 
  error: null
};
 
export const fetchSearchPostData = createAsyncThunk(
  "restaurant/fetchRestaurantSearchData",
  async (select, { rejectWithValue }) => {
    try {
      const data = await fetchSearchAPI(select);
      
      return data;
    } catch (error) {
      console.error('Fetch failed:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const searchDataSlice = createSlice({
  name: "postdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchPostData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchPostData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.initialObj = action.payload;
       
      })
      .addCase(fetchSearchPostData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        
      });
  }
});

export default searchDataSlice.reducer;
