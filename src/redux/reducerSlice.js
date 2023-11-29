import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  queryDate: "",
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
      console.log(state.queryDate);
    },
  },
});

export const { getFlightsArr, setQueryDate } = reducer.actions;

export default reducer.reducer;
