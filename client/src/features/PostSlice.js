import { createSlice } from "@reduxjs/toolkit";


export const PostSlice = createSlice({
    name : "Posts",
    initialState : {value : {Title:"Interesting", questions:[], questionsCount:0}},
    reducers: {
        postReducer : (state,{payload})=>{
            state.value.questions = payload;
        },
        titleReducer : (state,{payload})=>{
            state.value.Title = payload;
        },
        countReducer :   (state,{payload}) => {
            state.value.questionsCount = payload
        }
    }
});

export const {postReducer,titleReducer,countReducer} = PostSlice.actions;
export default PostSlice.reducer;