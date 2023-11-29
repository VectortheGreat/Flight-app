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

const limitedApi = rateLimit(schipholApi, {
  maxRequests: 5,
  perMilliseconds: 1000,
});

export const getFlights = async (scheduleDate, flightDirection) => {
  try {
    const response = await schipholApi.get("/flights", {
      params: {
        scheduleDate: scheduleDate,
        flightDirection: flightDirection,
      },
    });
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
