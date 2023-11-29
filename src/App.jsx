import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageContainer from "./containers/PageContainer";
import Header from "./components/navbar/Header";
import Departures from "./pages/Departures";
import Arrivals from "./pages/Arrivals";
import { useEffect, useState } from "react";
import { getFlights } from "./config/config";
import { useDispatch, useSelector } from "react-redux";
import { getFlightsArr } from "./redux/reducerSlice";
import ArrivalsDetail from "./pages/ArrivalsDetail";
import DeparturesDetail from "./pages/DeparturesDetail";

function App() {
  const dispatch = useDispatch();

  const flights = useSelector((state) => state.reducer.flights);
  const queryDate = useSelector((state) => state.reducer.queryDate);
  const [rotate, setRotate] = useState("");
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const dataFlight = await getFlights(queryDate, rotate);
        dispatch(getFlightsArr(dataFlight.flights));
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    console.log(rotate);
    fetchDatas();
  }, [queryDate, rotate]);
  return (
    <div>
      <Router>
        <Header></Header>
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/departures"
              element={
                <Departures
                  flights={flights}
                  setRotate={setRotate}
                ></Departures>
              }
            />
            <Route
              path="/arrivals"
              element={
                <Arrivals flights={flights} setRotate={setRotate}></Arrivals>
              }
            />
            <Route
              path="/departures/flight/:id"
              element={<DeparturesDetail></DeparturesDetail>}
            />
            <Route
              path="/arrivals/flight/:id"
              element={<ArrivalsDetail></ArrivalsDetail>}
            />
          </Routes>
        </PageContainer>
      </Router>
    </div>
  );
}

export default App;
