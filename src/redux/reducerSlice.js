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
      console.log(state.queryDate);
    },
    setRotateParam: (state, action) => {
      state.rotateParam = action.payload;
    },
    getNewFlightsArr: (state, action) => {
      const newFlights = action.payload;
      state.flights = [...newFlights, ...state.flights];
      // console.log(state.flights);
    },
  },
});

export const { getFlightsArr, setQueryDate, setRotateParam, getNewFlightsArr } =
  reducer.actions;

export default reducer.reducer;
