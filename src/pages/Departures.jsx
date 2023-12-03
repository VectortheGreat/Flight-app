import Flights from "../components/main/flights/Flights";
import UserSearch from "../components/main/UserSearch";
import PropTypes from "prop-types";

const Departures = ({ setRotate }) => {
  Departures.propTypes = {
    setRotate: PropTypes.string.isRequired,
  };
  setRotate("D");
  return (
    <div>
      <UserSearch></UserSearch>
      <Flights rotate={"D"}></Flights>
    </div>
  );
};

export default Departures;
