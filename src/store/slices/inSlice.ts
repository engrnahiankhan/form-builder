import { createSlice } from "@reduxjs/toolkit";

interface IsClickType {
  is_click: boolean;
}

const initialState: IsClickType = {
  is_click: true,
};

const inSlice = createSlice({
  name: "inSlice",
  initialState,
  reducers: {
    setClick: (state, action) => {
      state.is_click = action.payload;
    },
  },
});

export const { setClick } = inSlice.actions;
export default inSlice.reducer;
