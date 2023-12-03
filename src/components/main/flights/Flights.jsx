import PropTypes from "prop-types";
import {
  getAircrafttypes,
  getAirlines,
  getDestinations,
  getFlightStatus,
} from "../../../config/config";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRotateParam } from "../../../redux/reducerSlice";
import EarlierFlightsComp from "./EarlierFlightsComp";
import LaterFlightsComp from "./LaterFlightsComp";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Flights = ({ rotate }) => {
  Flights.propTypes = {
    rotate: PropTypes.string.isRequired,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.reducer.flights);
  const rotateDetail = useSelector((state) => state.reducer.rotateParam);
  const [airlineData, setAirlineData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [airCraftData, setAirCraftData] = useState("");
  const [loadingAirline, setLoadingAirline] = useState(false);
  const [loadingDestination, setLoadingDestination] = useState(false);
  const [loadingAircraft, setLoadingAircraft] = useState(false);

  useEffect(() => {
    const fetchDataAndHandleError = async (
      fetchFunction,
      setDataFunction,
      setLoadingFunction
    ) => {
      setLoadingFunction(true);

      try {
        const data = await fetchFunction();
        setDataFunction(data);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      } finally {
        setLoadingFunction(false);
      }
    };

    const fetchDatas = async () => {
      fetchDataAndHandleError(
        async () =>
          Promise.all(flights.map((flight) => getAirlines(flight.prefixIATA))),
        setAirlineData,
        setLoadingAirline
      );

      fetchDataAndHandleError(
        async () =>
          Promise.all(
            flights.map((flight) =>
              getDestinations(flight.route.destinations[0])
            )
          ),
        setDestinationData,
        setLoadingDestination
      );

      fetchDataAndHandleError(
        async () =>
          Promise.all(
            flights.map((flight) =>
              getAircrafttypes(
                flight.aircraftType?.iataMain,
                flight.aircraftType?.iataSub
              )
            )
          ),
        setAirCraftData,
        setLoadingAircraft
      );
    };
    if (rotate === "D") {
      dispatch(setRotateParam("departures"));
    } else if (rotate === "A") {
      dispatch(setRotateParam("arrivals"));
    }
    fetchDatas();
  }, [flights, rotate]);

  const navigateFlightDetail = (flightId) => {
    navigate(`/${rotateDetail}/flight/${flightId}`);
  };

  // console.log("Flights: ", flights);
  // console.log("Destinations: ", destinationData);
  // console.log("airCraftData: ", airCraftData);

  //prettier-ignore
  const createFlightElement = (flight,index,navigateFlightDetail,rotateDetail) => (
    <li key={flight.id}>
      <div className="bg-white hover:shadow-2xl shadow-md text-center rounded-sm py-6 grid grid-cols-5">
        {/* <h1>{index}</h1>  //? DEBUGGING
        <h1>{flight.id}</h1> //? DEBUGGING */} 
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
        <h1>
          {airCraftData &&
          airCraftData[index] &&
          airCraftData[index].aircraftTypes &&
          airCraftData[index].aircraftTypes[0]
            ? airCraftData[index].aircraftTypes[0].shortDescription
            : "-"}
        </h1>

        <h1>{getFlightStatus(flight)}</h1>
        <div className="flex items-center justify-center space-x-2 text-blue-500 hover:text-blue-700">
          <Link
            className="cursor-pointer"
            onClick={() => navigateFlightDetail(flight.id)}
            to={`/${rotateDetail}/flight/${flight.id}`}
          >
            Details
          </Link>
          <Link
            onClick={() => navigateFlightDetail(flight.id)}
            to={`/${rotateDetail}/flight/${flight.id}`}
            className="flex items-center cursor-pointer"
          >
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </li>
  );

  const navigateRotate = (flightRotate) => {
    navigate(`${flightRotate}`);
    setLoadingAirline(false);
    setLoadingDestination(false);
    setLoadingAircraft(false);
    window.location.reload();
  };

  return (
    <div>
      {loadingAircraft || loadingAirline || loadingDestination ? (
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
        <div>
          <div>
            {rotate === "D" && (
              <div className="bg-white flex space-x-6 text-center px-2">
                <Link className="border-b-blue-600 border-b-2">Departures</Link>
                <Link
                  className="hover:bg-blue-600 hover:text-white"
                  onClick={() => navigateRotate("/arrivals")}
                  to={"/arrivals"}
                >
                  Arrivals
                </Link>
              </div>
            )}
            {rotate === "A" && (
              <div className="bg-white flex space-x-6 text-center px-2">
                <Link
                  className="hover:bg-blue-600 hover:text-white"
                  onClick={() => navigateRotate("/departures")}
                  to={"/departures"}
                >
                  Departures
                </Link>
                <Link className="border-b-blue-600 border-b-2">Arrivals</Link>
              </div>
            )}
          </div>
          <ul className="mt-3 space-y-3">
            <li>
              <div className="bg-gray-200 shadow-md text-center rounded-sm py-2 grid grid-cols-5">
                <h1>Schedule Time</h1>
                <h1>City / Airport</h1>
                <h1>Aircraft Type</h1>
                <h1>Status</h1>
                <h1>Details</h1>
              </div>
            </li>
            <EarlierFlightsComp rotate={rotate}></EarlierFlightsComp>
            {flights && flights.length > 0 ? (
              flights.map((flight, index) => (
                <React.Fragment key={flight.id}>
                  {createFlightElement(
                    flight,
                    index,
                    navigateFlightDetail,
                    rotateDetail
                  )}
                </React.Fragment>
              ))
            ) : (
              <p className="text-center bg-rose-700 my-10">
                No flights available
              </p>
            )}

            <LaterFlightsComp rotate={rotate}></LaterFlightsComp>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Flights;
