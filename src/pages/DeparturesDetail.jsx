import { useLocation } from "react-router-dom";
import {
  getAircrafttypes,
  getAirlines,
  getDestinations,
  getFlightsById,
} from "../config/config";
import { useEffect, useState } from "react";

const DeparturesDetail = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const lastElement = pathArray[pathArray.length - 1];

  const [flight, setFlight] = useState("");
  const [destination, setDestination] = useState("");
  const [airlineData, setAirlineData] = useState("");
  const [airCraftData, setAirCraftData] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchDatas = async () => {
      try {
        const dataFlight = await getFlightsById(lastElement);

        if (isMounted) {
          setFlight(dataFlight);

          const dataAirline = await getAirlines(dataFlight.prefixIATA);
          setAirlineData(dataAirline);

          const dataAirCraftType = await getAircrafttypes(
            dataFlight.aircraftType?.iataMain,
            dataFlight.aircraftType?.iataSub
          );
          setAirCraftData(dataAirCraftType.aircraftTypes[0]);

          const dataDestinations = await getDestinations(
            dataFlight.route.destinations[0]
          );
          if (dataDestinations.city !== null) {
            setDestination(dataDestinations.city);
          } else if (dataDestinations.publicName.english !== null) {
            setDestination(dataDestinations.publicName.english);
          } else {
            console.error("Null Value");
          }
        }
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchDatas();

    return () => {
      isMounted = false;
    };
  }, [lastElement]);

  console.log(flight);

  return (
    <div className="bg-gray-200 p-8">
      <h1 className="text-2xl font-bold mb-4">{flight.flightName} flight to</h1>
      <h1 className="text-2xl font-bold mb-4">{destination}</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-lg font-semibold">Date</h2>
          <h2 className="text-lg">{flight.scheduleDate}</h2>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Departure time</h2>
          <h2 className="text-lg">{flight.scheduleTime}</h2>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Airline Code</h2>
          <h2 className="text-lg">{flight.airlineCode}</h2>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Airlines</h2>
          <h2 className="text-lg">{airlineData.publicName}</h2>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Aircraft Type</h2>
          <h2 className="text-lg">{airCraftData.shortDescription}</h2>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Gate</h2>
          <h2 className="text-lg">{flight.gate}</h2>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-red-500">Gate closed</h1>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Expected</h2>
        <h2 className="text-lg">{flight.expectedTimeGateOpen}</h2>
      </div>
    </div>
  );
};

export default DeparturesDetail;
