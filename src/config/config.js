import axios from "axios";

const ApiID = import.meta.env.VITE_API_ID;
const ApiKey = import.meta.env.VITE_API_KEY;

const schipholApi = axios.create({
  baseURL: "https://api.schiphol.nl/public-flights",
  headers: {
    Accept: "application/json",
    resourceversion: "v4",
    app_id: ApiID,
    app_key: ApiKey,
  },
});

export const getFlights = async (scheduleDate) => {
  try {
    const response = await schipholApi.get("/flights", {
      params: {
        scheduleDate: scheduleDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};
