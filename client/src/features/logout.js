import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name : "logout",
    initialState : {value : { isLoading : false,
    isAuth : false,
    error : ''}},
    reducers: {
        logoutPending : (state)=>{
            state.value.isLoading = true;
        },
        logoutSuccess : (state)=>{
            state.value.isLoading = false;
            state.value.isAuth=true;
            state.value.error = "";
        }
    }
});

export const {logoutPending,logoutSuccess} = userSlice.actions;
export default userSlice.reducer;