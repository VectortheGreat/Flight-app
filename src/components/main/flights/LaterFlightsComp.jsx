import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlights } from "../../../config/config";
import { getNewFlightsArr } from "../../../redux/reducerSlice";
const LaterFlightsComp = ({ rotate }) => {
  LaterFlightsComp.propTypes = {
    rotate: PropTypes.string.isRequired,
  };
  const queryDate = useSelector((state) => state.reducer.queryDate);
  const dispatch = useDispatch();
  const date = new Date();
  const formatTimeComponent = (component) => {
    return component < 10 ? "0" + component : component;
  };
  const hours = formatTimeComponent(date.getHours());
  const minutes = formatTimeComponent(date.getMinutes());
  const datee = formatTimeComponent(date.getDate());
  const months = formatTimeComponent(date.getMonth() + 1);
  const [pageCounter, setPageCounter] = useState(1);
  const moreLaterFlights = async () => {
    const fromDateTime = `${date.getFullYear()}-${months}-${datee}T${hours}:${minutes}:00`;
    try {
      setPageCounter(pageCounter + 1);
      //prettier-ignore
      const dataFlight = await getFlights(queryDate,rotate,fromDateTime,null,pageCounter,"+scheduleTime");
      dispatch(getNewFlightsArr([...dataFlight.flights]));
    } catch (error) {
      console.error("Error fetching more flights:", error);
    }
  };
  return (
    <div className="mt-3 space-y-3">
      <li>
        <div
          className="bg-gray-100 text-blue-600 hover:shadow-2xl cursor-pointer shadow-md text-center rounded-sm py-1 grid grid-cols-1 my-2"
          onClick={moreLaterFlights}
        >
          Show later flights
        </div>
      </li>
    </div>
  );
};

export default LaterFlightsComp;
