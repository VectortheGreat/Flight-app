const Home = () => {
  return (
    <div className="text-center">
      <h1>Flights</h1>
      <div className="flex space-x-6 justify-evenly">
        <button className="bg-blue-700 text-white rounded-md p-2">
          Departures
        </button>
        <button className="bg-blue-700 text-white rounded-md p-2">
          Arrivals
        </button>
      </div>
    </div>
  );
};

export default Home;
