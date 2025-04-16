import { createSlice } from "@reduxjs/toolkit";
const userDataSlicer = createSlice({
  name: "userData",
  initialState: { data: [] },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = userDataSlicer.actions;
export default userDataSlicer.reducer;
