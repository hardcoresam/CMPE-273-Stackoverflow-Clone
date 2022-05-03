import { createSlice } from "@reduxjs/toolkit";


export const UserSlice = createSlice({
    name: "User",
    initialState: {
        value: {
            registered_on: "",
            last_login_time: "",
            id: 1,
            email: "",
            username: "",
            passwor: "",
            photo: null,
            about: null,
            is_admin: false,
            reputation: 1,
            location: null,
            gold_badges_count: 0,
            silver_badges_count: 0,
            bronze_badges_count: 0,
            Badges: [],
            answersCount: 1,
            questionsCount: 2,
            userReach: 0,
            bronzeBadges: [],
            silverBadges: [],
            goldBadges: []
        }
    },
    reducers: {
        userReducer: (state, {payload}) => {
            // const { Title, questionCount } = action.payload;
            // const{username} = action.payload;
            state.value = payload;
        },

    }
});

export const { userReducer } = UserSlice.actions;
export default UserSlice.reducer;