import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  queryDate: "",
  rotateParam: "",
};

const reducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    getFlightsArr: (state, action) => {
      state.flights = action.payload;
    },
    setQueryDate: (state, action) => {
      state.queryDate = action.payload;
    },
    setRotateParam: (state, action) => {
      state.rotateParam = action.payload;
    },
  },
});

export const { getFlightsArr, setQueryDate, setRotateParam } = reducer.actions;

export default reducer.reducer;
