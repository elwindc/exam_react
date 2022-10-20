import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "isLoggin",
    initialState: { value: { test: false} },
    reducers: {
        loginState: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { loginState } = userSlice.actions;
export default userSlice.reducer