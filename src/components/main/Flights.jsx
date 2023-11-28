import PropTypes from "prop-types";

const Flights = ({ flights }) => {
  Flights.propTypes = {
    flights: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        scheduleDateTime: PropTypes.string.isRequired,
      })
    ).isRequired,
    setQueryDate: PropTypes.func.isRequired,
  };
  return (
    <div>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <div>{/* <h1>{flight.}</h1>   */}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
