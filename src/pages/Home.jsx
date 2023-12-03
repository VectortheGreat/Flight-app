import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const navigateRotate = (flightRotate) => {
    navigate(`${flightRotate}`);
    window.location.reload();
  };
  return (
    <div className="text-center">
      <h1>Flights</h1>
      <div className="flex space-x-6 justify-evenly">
        <Link
          className="bg-blue-700 text-white rounded-md p-2"
          onClick={() => navigateRotate("/departures")}
          to={"/departures"}
        >
          Departures
        </Link>
        <Link
          className="bg-blue-700 text-white rounded-md p-2"
          onClick={() => navigateRotate("/arrivals")}
          to={"/arrivals"}
        >
          Arrivals
        </Link>
      </div>
    </div>
  );
};

export default Home;
