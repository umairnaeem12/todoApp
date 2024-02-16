// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        userToken: null,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload;
        },
        resetUser: (state) => {
            state.userId = null;
            state.userToken = null;
        },
    },
});

export const { setUserId, setUserToken, resetUser } = userSlice.actions;
export default userSlice.reducer;
