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
      console.log(state.flights);
    },
    setQueryDate: (state, action) => {
      state.queryDate = action.payload;
    },
    setRotateParam: (state, action) => {
      state.rotateParam = action.payload;
    },
    getNewFlightsArr: (state, action) => {
      const newFlights = action.payload;
      state.flights = [...newFlights, ...state.flights];
    },
  },
});

export const { getFlightsArr, setQueryDate, setRotateParam, getNewFlightsArr } =
  reducer.actions;

export default reducer.reducer;
