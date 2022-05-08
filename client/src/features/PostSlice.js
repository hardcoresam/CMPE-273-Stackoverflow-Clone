import { createSlice } from "@reduxjs/toolkit";


export const PostSlice = createSlice({
    name : "Posts",
    initialState : {value : { questions:[]}},
    reducers: {
        postReducer: (state,{payload})=>{
            state.value.questions = payload;
        },
             
    }
});

export const {postReducer} = PostSlice.actions;
export default PostSlice.reducer;