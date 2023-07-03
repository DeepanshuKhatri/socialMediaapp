import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: true,
    users:{
        name:"",
        email:"",
        uid:""
    }
};

export const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        addUser:(state, action)=>{
            state.users = action.payload
            state.isLoggedIn=true
            console.log(state.users);
        }
    }
})
export const {addUser} = userSlice.actions;
export default userSlice.reducer;