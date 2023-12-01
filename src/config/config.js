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

export const getFlights = async (
  scheduleDate,
  flightDirection,
  fromDateTime,
  toDateTime,
  page,
  sort
) => {
  try {
    const response = await schipholApi.get("/flights", {
      params: {
        scheduleDate: scheduleDate,
        flightDirection: flightDirection,
        fromDateTime: fromDateTime,
        toDateTime: toDateTime,
        searchDateTimeField: "scheduleDateTime",
        page: page,
        sort: sort,
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

export const getAircrafttypes = async (iataMain, iataSub) => {
  try {
    const response = await schipholApi.get(`/aircrafttypes`, {
      params: {
        iataMain: iataMain,
        iataSub: iataSub,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};
