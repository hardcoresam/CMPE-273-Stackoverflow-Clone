import { createSlice } from "@reduxjs/toolkit";


export const DashboardTopSlice = createSlice({
    name : "DashboardTop",
    initialState : {value : { Title : "",questionCount:""}},
    reducers: {
        clickReducer: (state,action)=>{
            const {Title,questionCount} = action.payload;
            state.value.Title = Title;
            state.value.questionCount = questionCount;
        },
             
    }
});

export const {clickReducer} = DashboardTopSlice.actions;
export default DashboardTopSlice.reducer;