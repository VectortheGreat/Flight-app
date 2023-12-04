import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  queryDate: "",
  rotateParam: "",
  searchParam: "",
  loadingAirline: false,
  loadingDestination: false,
  loadingAircraft: false,
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
    getLaterFlightsArr: (state, action) => {
      const newFlights = action.payload;
      state.flights = [...state.flights, ...newFlights];
    },
    getEarlierFlightsArr: (state, action) => {
      const newFlights = action.payload;
      state.flights = [...newFlights, ...state.flights];
    },
    setSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },
    setLoadingAirline(state, action) {
      state.loadingAirline = action.payload;
    },
    setLoadingDestination(state, action) {
      state.loadingDestination = action.payload;
    },
    setLoadingAircraft(state, action) {
      state.loadingAircraft = action.payload;
    },
  },
});

export const {
  getFlightsArr,
  setQueryDate,
  setRotateParam,
  getLaterFlightsArr,
  getEarlierFlightsArr,
  setSearchParam,
  setLoadingAirline,
  setLoadingDestination,
  setLoadingAircraft,
} = reducer.actions;

export default reducer.reducer;
