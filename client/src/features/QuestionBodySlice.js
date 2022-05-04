import { createSlice } from "@reduxjs/toolkit";


export const QuestionBodySlice = createSlice({
    name : "QuestionBody",
    initialState : {value : { body:"" }},
    reducers: {
        updatingbody : (state,{payload})=>{
            state.value.body = payload;
        }
    }
});

export const {updatingbody} = QuestionBodySlice.actions;
export default QuestionBodySlice.reducer;