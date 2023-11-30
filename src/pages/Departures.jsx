import Flights from "../components/main/Flights";
import UserSearch from "../components/main/UserSearch";

const Departures = ({ flights, setRotate }) => {
  setRotate("D");
  return (
    <div>
      <UserSearch></UserSearch>
      <Flights flights={flights} rotate={"D"}></Flights>
    </div>
  );
};

export default Departures;
