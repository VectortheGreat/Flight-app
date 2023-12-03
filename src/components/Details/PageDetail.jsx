import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import {
  getAircrafttypes,
  getAirlines,
  getDestinations,
  getFlightStatus,
  getFlightsById,
} from "../../config/config";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const PageDetail = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  const rotate = pathArray[pathArray.length - 3];
  const lastElement = pathArray[pathArray.length - 1];

  const [flight, setFlight] = useState("");
  const [destination, setDestination] = useState("");
  const [airlineData, setAirlineData] = useState("");
  const [airCraftData, setAirCraftData] = useState("");
  const [loadingFlight, setLoadingFlight] = useState(false);
  const [loadingAirline, setLoadingAirline] = useState(false);
  const [loadingAircraft, setLoadingAircraft] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchDatas = async () => {
      try {
        setLoadingFlight(true);
        const dataFlight = await getFlightsById(lastElement);
        if (isMounted) {
          setFlight(dataFlight);
        }

        setLoadingAirline(true);
        const dataAirline = await getAirlines(dataFlight.prefixIATA);
        if (isMounted) {
          setAirlineData(dataAirline);
        }

        setLoadingAircraft(true);
        const dataAirCraftType = await getAircrafttypes(
          dataFlight.aircraftType?.iataMain,
          dataFlight.aircraftType?.iataSub
        );
        if (isMounted) {
          setAirCraftData(dataAirCraftType.aircraftTypes[0]);
        }

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
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        if (isMounted) {
          setLoadingFlight(false);
          setLoadingAirline(false);
          setLoadingAircraft(false);
        }
      }
    };
    fetchDatas();
    return () => {
      isMounted = false;
    };
  }, [lastElement]);
  console.log(flight);
  console.log("loadingFlight", loadingFlight);
  console.log("loadingAirline", loadingAirline);
  console.log("loadingAircraft", loadingAircraft);

  return (
    <div className="bg-gray-200 p-8">
      {loadingFlight || loadingAirline || loadingAircraft ? (
        <div className="loading-container">
          <div className="flex space-x-2 items-center">
            <ClipLoader
              color="#3498db"
              loading={true}
              css={override}
              size={50}
            />
            <p>Loading</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 p-8">
          <h1 className="text-2xl font-bold mb-4">
            {flight.flightName} flight to
          </h1>
          <h1 className="text-2xl font-bold mb-4">{destination}</h1>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Date</h2>
              <h2 className="text-lg">{flight.scheduleDate}</h2>
            </div>
            <div>
              {rotate === "departures" && (
                <>
                  <h2 className="text-lg font-semibold">Departure time</h2>
                  <h2 className="text-lg">{flight.scheduleTime}</h2>
                </>
              )}
              {rotate === "arrivals" && (
                <>
                  <h2 className="text-lg font-semibold">Arrival time</h2>
                  <h2 className="text-lg">{flight.scheduleTime}</h2>
                  <h2 className="text-lg">{flight.actualLandingTime}</h2>
                </>
              )}
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
              {rotate === "departures" && (
                <>
                  <h2 className="text-lg font-semibold">Gate</h2>
                  <h2 className="text-lg">{flight.gate}</h2>
                </>
              )}
              {rotate === "arrivals" && (
                <>
                  <h2 className="text-lg font-semibold">Baggage Belt</h2>
                  <h2 className="text-lg">
                    {flight.baggageClaim?.belts[0] ?? "-"}
                  </h2>
                </>
              )}
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-2xl font-bold text-red-500">
              {getFlightStatus(flight)}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageDetail;
