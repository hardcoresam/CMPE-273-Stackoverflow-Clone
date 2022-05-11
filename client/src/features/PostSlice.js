import { createSlice } from "@reduxjs/toolkit";


export const PostSlice = createSlice({
    name : "Posts",
    initialState : {value : {Title:"Interesting", questions:[]}},
    reducers: {
        postReducer : (state,{payload})=>{
            state.value.questions = payload;
        },
        titleReducer : (state,{payload})=>{
            state.value.Title = payload;
        }
             
    }
});

export const {postReducer,titleReducer} = PostSlice.actions;
export default PostSlice.reducer;