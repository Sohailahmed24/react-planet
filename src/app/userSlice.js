import { createSlice } from "@reduxjs/toolkit"


const initialState={
    user:null,
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        logInUser :(state,action)=>{
             console.log(action.payload)
            state.user=action.payload
        },
        logOut:(state,action)=>{
                 state.user=null
        },
        upDateUser:(state,action)=>{
            console.log(action.payload)
            state.user=action.payload
        }
    }
})
export const {logInUser,logOut,upDateUser}=userSlice.actions
export default userSlice.reducer