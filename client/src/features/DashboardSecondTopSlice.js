import { createSlice } from "@reduxjs/toolkit";


export const DashboardSecondTopSlice = createSlice({
    name : "DashboardSecondTop",
    initialState : {value : { Title : "Top Questions",Description:"", flag : true}},
    reducers: {
        onclickReducer: (state,action)=>{
            const {Title,Description} = action.payload;
            state.value.Title = Title;
            state.value.Description = Description;
        },
        onShowReducer:(state,{payload})=>{
            state.value.flag = payload
        }  
    }
});

export const {onclickReducer,onShowReducer} = DashboardSecondTopSlice.actions;
export default DashboardSecondTopSlice.reducer;