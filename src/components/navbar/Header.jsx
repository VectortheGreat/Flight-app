import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-500 p-4 flex justify-between">
      <h1
        className="text-white text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Flight App
      </h1>
      <h1
        className="text-white text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/departures")}
      >
        Departures
      </h1>
      <h1
        className="text-white text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/arrivals")}
      >
        Arrivals
      </h1>
    </header>
  );
};

export default Header;
