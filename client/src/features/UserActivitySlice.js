import { createSlice } from "@reduxjs/toolkit";


export const UserActivitySlice = createSlice({
    name : "UserActivity",
    initialState : {value : { status:"Answers"}},
    reducers: {
        statusReducer: (state,{payload})=>{
            state.value.status = payload;
        },
             
    }
});

export const {statusReducer} = UserActivitySlice.actions;
export default UserActivitySlice.reducer;