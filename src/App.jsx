// App.js
import { useEffect, useState } from "react";
import { getFlights } from "./config/config";

function App() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlights();
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  console.log(flights);

  return (
    <div>
      <h1>Flight Information</h1>
      {/* <ul>
        {flights.map((flight) => (
          <li key={flight.id}>{flight.flightName}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
