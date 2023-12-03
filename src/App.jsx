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
    const date = new Date();
    const formatTimeComponent = (component) => {
      return component < 10 ? "0" + component : component;
    };
    const hours = formatTimeComponent(date.getHours());
    const minutes = formatTimeComponent(date.getMinutes());
    const fromDateTime = `${queryDate}T${hours}:${minutes}:00`;
    const fetchDatas = async () => {
      try {
        const dataFlight = await getFlights(
          queryDate,
          rotate,
          fromDateTime,
          null,
          0,
          "+scheduleTime"
        );

        console.warn(queryDate);
        console.warn(fromDateTime);
        dispatch(getFlightsArr(dataFlight.flights));
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };
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
              element={<Departures setRotate={setRotate}></Departures>}
            />
            <Route
              path="/arrivals"
              element={
                <Arrivals flights={flights} setRotate={setRotate}></Arrivals>
              }
            />
            <Route
              path="/departures/flight/:id"
              element={
                <DeparturesDetail
                  flights={flights}
                  setRotate={setRotate}
                ></DeparturesDetail>
              }
            />
            <Route
              path="/arrivals/flight/:id"
              element={
                <ArrivalsDetail
                  flights={flights}
                  setRotate={setRotate}
                ></ArrivalsDetail>
              }
            />
          </Routes>
        </PageContainer>
      </Router>
    </div>
  );
}

export default App;
