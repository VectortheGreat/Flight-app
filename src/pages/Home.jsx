import { useEffect, useState } from "react";
import { getFlights } from "../config/config";
import UserSearch from "../components/main/UserSearch";
import Flights from "../components/main/Flights";

const Home = () => {
  const [flights, setFlights] = useState([]);
  const [queryDate, setQueryDate] = useState();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlights(queryDate);
        console.log(data.flights);
        setFlights(data.flights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, [queryDate]);

  return (
    <div>
      <h1>Flight Information</h1>
      <UserSearch setQueryDate={setQueryDate}></UserSearch>
      <Flights flights={flights}></Flights>
    </div>
  );
};

export default Home;
