import PropTypes from "prop-types";
import {
  getAirlines,
  getDestinations,
  getFlightStatus,
  getFlights,
} from "../../config/config";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRotateParam } from "../../redux/reducerSlice";

const Flights = ({ rotate }) => {
  Flights.propTypes = {
    rotate: PropTypes.string.isRequired,
  };
  const flights = useSelector((state) => state.reducer.flights);
  const rotateDetail = useSelector((state) => state.reducer.rotateParam);
  const [airlineData, setAirlineData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (rotate === "D") {
      dispatch(setRotateParam("departures"));
    } else if (rotate === "A") {
      dispatch(setRotateParam("arrivals"));
    }
    const fetchDatas = async () => {
      try {
        const airlinePromises = flights.map(async (flight) => {
          const dataAirline = await getAirlines(flight.prefixIATA);
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

  const navigateFlightDetail = (index) => {
    navigate(`/${rotateDetail}/flight/${flights[index].id}`);
  };

  //? TEMPORARY
  const date = new Date();

  const queryDate = useSelector((state) => state.reducer.queryDate);

  const [laterFlightsMap, setlaterFlightsMap] = useState([]);
  const [pageCounter, setPageCounter] = useState(1);
  const moreLaterFlights = async () => {
    const formatTimeComponent = (component) => {
      return component < 10 ? "0" + component : component;
    };
    const hours = formatTimeComponent(date.getHours());
    const minutes = formatTimeComponent(date.getMinutes());
    const datee = formatTimeComponent(date.getDate());
    const months = formatTimeComponent(date.getMonth() + 1);
    const fromDateTime = `${date.getFullYear()}-${months}-${datee}T${hours}:${minutes}:00`;
    try {
      setPageCounter(pageCounter + 1);
      console.warn(pageCounter);
      const dataFlight = await getFlights(
        queryDate,
        rotate,
        fromDateTime,
        null,
        pageCounter,
        "+scheduleTime"
      );
      const newElements = dataFlight.flights.map((flight, index) => (
        <li key={flight.id} onClick={() => navigateFlightDetail(index)}>
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
            <h1>{getFlightStatus(flight)}</h1>
            <Link
              to={`/${rotateDetail}/flight/${flights[index].id}`}
              className="flex items-center justify-center space-x-2"
            >
              <span>Details</span>
              <span className="flex items-center">
                <FaArrowRight />
              </span>
            </Link>
          </div>
        </li>
      ));

      setlaterFlightsMap((prevElements) => [...prevElements, ...newElements]);
    } catch (error) {
      console.error("Error fetching more flights:", error);
    }
  };

  const [earlierFlightsMap, setEarlierFlightsMap] = useState([]);
  const [pageEarlierCounter, setPageEarlierCounter] = useState(0);
  const moreEarlierFlights = async () => {
    const formatTimeComponent = (component) => {
      return component < 10 ? "0" + component : component;
    };
    const hours = formatTimeComponent(date.getHours());
    const minutes = formatTimeComponent(date.getMinutes());
    const datee = formatTimeComponent(date.getDate());
    const months = formatTimeComponent(date.getMonth() + 1);
    const fromDateTime = `${date.getFullYear()}-${months}-${datee}T00:00:00`;
    const toDateTime = `${date.getFullYear()}-${months}-${datee}T${hours}:${minutes}:00`;
    try {
      setPageEarlierCounter(pageEarlierCounter + 1);
      console.warn(pageEarlierCounter);
      const dataFlight = await getFlights(
        queryDate,
        rotate,
        fromDateTime,
        toDateTime,
        pageEarlierCounter,
        "-scheduleTime"
      );
      const newElements = dataFlight.flights.map((flight, index) => (
        <li key={flight.id} onClick={() => navigateFlightDetail(index)}>
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
            <h1>{getFlightStatus(flight)}</h1>
            <Link
              to={`/${rotateDetail}/flight/${flights[index].id}`}
              className="flex items-center justify-center space-x-2"
            >
              <span>Details</span>
              <span className="flex items-center">
                <FaArrowRight />
              </span>
            </Link>
          </div>
        </li>
      ));

      setEarlierFlightsMap((prevElements) => [
        ...newElements.reverse(),
        ...prevElements,
      ]);
    } catch (error) {
      console.error("Error fetching more flights:", error);
    }
  };

  return (
    <div>
      <ul className="mt-3 space-y-3">
        <li>
          <div className="bg-gray-200 shadow-md text-center rounded-sm py-2 grid grid-cols-4">
            <h1>Time</h1>
            <h1>Airport</h1>
            <h1>Status</h1>
            <h1>Details</h1>
          </div>
        </li>
        <li>
          <div
            className="bg-gray-100 text-blue-600 hover:shadow-2xl cursor-pointer shadow-md text-center rounded-sm py-1 grid grid-cols-1 my-2"
            onClick={moreEarlierFlights}
          >
            Show earlier flights
          </div>
        </li>
        {earlierFlightsMap}
        {flights.map((flight, index) => (
          <li key={flight.id}>
            <div className="bg-white hover:shadow-2xl shadow-md text-center rounded-sm py-6 grid grid-cols-4">
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
              <h1>{getFlightStatus(flight)}</h1>
              <Link
                onClick={() => navigateFlightDetail(index)}
                to={`/${rotateDetail}/flight/${flights[index].id}`}
                className="flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Details</span>
                <span className="flex items-center">
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </li>
        ))}
        {laterFlightsMap}
        <li>
          <div
            className="bg-gray-100 text-blue-600 hover:shadow-2xl cursor-pointer shadow-md text-center rounded-sm py-1 grid grid-cols-1 my-2"
            onClick={moreLaterFlights}
          >
            Show later flights
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Flights;
