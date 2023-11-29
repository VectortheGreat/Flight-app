import Flights from "../components/main/Flights";
import UserSearch from "../components/main/UserSearch";

const Arrivals = ({ flights, setRotate }) => {
  setRotate("A");
  return (
    <div>
      <UserSearch></UserSearch> */
      <Flights flights={flights}></Flights>
    </div>
  );
};

export default Arrivals;
