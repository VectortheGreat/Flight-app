import axios from "axios";

const ApiID = import.meta.env.VITE_API_ID;
const ApiKey = import.meta.env.VITE_API_KEY;

const schipholApi = axios.create({
  baseURL: "https://api.schiphol.nl/public-flights",
  // baseURL: "/api",
  headers: {
    Accept: "application/json",
    resourceversion: "v4",
    app_id: ApiID,
    app_key: ApiKey,
  },
});

const date = new Date();
const formatTimeComponent = (component) => {
  return component < 10 ? "0" + component : component;
};
const hours = formatTimeComponent(date.getHours());
const minutes = formatTimeComponent(date.getMinutes());
const fromDateTime = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}T${hours}:${minutes}:00`;
console.log(fromDateTime);

export const getFlights = async (scheduleDate, flightDirection) => {
  try {
    const response = await schipholApi.get("/flights", {
      params: {
        scheduleDate: scheduleDate,
        flightDirection: flightDirection,
        fromDateTime: fromDateTime,
        searchDateTimeField: "scheduleDateTime",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

export const getFlightsById = async (id) => {
  try {
    const response = await schipholApi.get(`/flights/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

export const getAirlines = async (airline) => {
  try {
    const response = await schipholApi.get(`/airlines/${airline}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

export const getDestinations = async (destinations) => {
  try {
    const response = await schipholApi.get(`/destinations/${destinations}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};
