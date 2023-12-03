import { useState } from "react";
import { getFlights } from "../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getNewFlightsArr } from "../../../redux/reducerSlice";

const EarlierFlightsComp = ({
  rotate,
  // createFlightElement,
  // navigateFlightDetail,
}) => {
  EarlierFlightsComp.propTypes = {
    rotate: PropTypes.string.isRequired,
    createFlightElement: PropTypes.func.isRequired,
    navigateFlightDetail: PropTypes.func.isRequired,
  };
  // const flights = useSelector((state) => state.reducer.flights);
  // const rotateDetail = useSelector((state) => state.reducer.rotateParam);
  const queryDate = useSelector((state) => state.reducer.queryDate);
  const dispatch = useDispatch();

  const date = new Date();
  const formatTimeComponent = (component) => {
    return component < 10 ? "0" + component : component;
  };
  const hours = formatTimeComponent(date.getHours());
  const minutes = formatTimeComponent(date.getMinutes());
  // const datee = formatTimeComponent(date.getDate());
  // const months = formatTimeComponent(date.getMonth() + 1);
  // const [earlierFlightsMap, setEarlierFlightsMap] = useState([]);
  const [pageEarlierCounter, setPageEarlierCounter] = useState(0);

  const moreEarlierFlights = async () => {
    const fromDateTime = `${queryDate}T00:00:00`;
    const toDateTime = `${queryDate}T${hours}:${minutes}:00`;

    try {
      setPageEarlierCounter(pageEarlierCounter + 1);
      //prettier-ignore
      const dataFlight = await getFlights(queryDate,rotate,fromDateTime,toDateTime,pageEarlierCounter,"-scheduleTime");
      // const newElements = dataFlight.flights.map((flight, index) =>
      //   //prettier-ignore
      //   createFlightElement(flight,index,navigateFlightDetail,flights,rotateDetail)
      // );

      // setEarlierFlightsMap((prevElements) => [
      //   ...newElements.reverse(),
      //   ...prevElements,
      // ]);
      dispatch(getNewFlightsArr([...dataFlight.flights].reverse()));
    } catch (error) {
      console.error("Error fetching more flights:", error);
    }
  };
  return (
    <div className="mt-3 space-y-3">
      <li>
        <div
          className="bg-gray-100 text-blue-600 hover:shadow-2xl shadow-md text-center rounded-sm py-1 grid grid-cols-1 my-2 cursor-pointer"
          onClick={moreEarlierFlights}
        >
          Show earlier flights
        </div>
      </li>
      {/* {earlierFlightsMap} */}
    </div>
  );
};

export default EarlierFlightsComp;
