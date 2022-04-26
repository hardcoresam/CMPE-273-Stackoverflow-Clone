import { createSlice } from "@reduxjs/toolkit";


export const DashboardSecondTopSlice = createSlice({
    name : "DashboardSecondTop",
    initialState : {value : { Title : "Top Questions",Description:"", flag : true,tagflag : true}},
    reducers: {
        onclickReducer: (state,action)=>{
            const {Title,Description} = action.payload;
            state.value.Title = Title;
            state.value.Description = Description;
        },
        onShowReducer:(state,action)=>{
            const {flag,tagflag} = action.payload;
            state.value.flag = flag;
            state.value.tagflag = tagflag;
        }  
    }
});

export const {onclickReducer,onShowReducer} = DashboardSecondTopSlice.actions;
export default DashboardSecondTopSlice.reducer;