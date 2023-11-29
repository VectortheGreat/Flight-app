import { useLocation } from "react-router-dom";
import Flights from "../components/main/Flights";
import UserSearch from "../components/main/UserSearch";

const Departures = ({ flights, setRotate }) => {
  const location = useLocation();
  setRotate("D");
  // location.pathname.split("/")[1] === "departures"?setRotate(location.pathname.split("/")[1])
  return (
    <div>
      <UserSearch></UserSearch> */
      <Flights flights={flights} rotate={"D"}></Flights>
    </div>
  );
};

export default Departures;
