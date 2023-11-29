import PropTypes from "prop-types";
import { getAirlines, getDestinations } from "../../config/config";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Flights = ({ flights, rotate }) => {
  Flights.propTypes = {
    flights: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        scheduleDateTime: PropTypes.string.isRequired,
      })
    ).isRequired,
    setQueryDate: PropTypes.func.isRequired,
  };
  const [airlineData, setAirlineData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const airlinePromises = flights.map(async (flight) => {
          const dataAirline = await getAirlines(flight.prefixIATA);
          //console.log(flight.prefixIATA);
          return dataAirline;
        });

        const resolvedAirlineData = await Promise.all(airlinePromises);
        setAirlineData(resolvedAirlineData);

        const destinationPromises = flights.map(async (flight) => {
          const dataDestination = await getDestinations(
            flight.route.destinations[0]
          );

          return dataDestination;
        });

        const resolvedDestinationData = await Promise.all(destinationPromises);
        setDestinationData(resolvedDestinationData);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchDatas();
  }, [flights]);

  const navigateFlightDetail = () => {
    //  const rotateDetail = rotate === "D" ? "departures" : rotate==="A"?"arrivals"
    let rotateDetail = "";
    if (rotate === "D") {
      rotateDetail = "departures";
    } else if (rotate === "A") {
      rotateDetail = "arrivals";
    }
    // navigate(`/${rotateDetail}`);
    console.log(rotateDetail);
  };
  return (
    <div>
      <ul className="mt-3 space-y-3">
        {flights.map((flight, index) => (
          <li key={flight.id} onClick={navigateFlightDetail}>
            <div className="bg-white hover:shadow-2xl cursor-pointer shadow-md text-center rounded-sm py-6 grid grid-cols-4">
              <h1>{flight.scheduleTime}</h1>
              <div className="space-x-2">
                <h1>
                  {destinationData[index]?.city}
                  <span> ({destinationData[index]?.iata})</span>
                </h1>
                <h1 className="text-sm font-thin">
                  {flight.flightName}
                  <span> {airlineData[index]?.publicName}</span>
                </h1>
              </div>
              <h1>{flight.flightName}</h1>
              <a className="flex items-center justify-center space-x-2">
                <span>Details</span>
                <span className="flex items-center">
                  <FaArrowRight />
                </span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
