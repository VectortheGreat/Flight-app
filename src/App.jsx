import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageContainer from "./containers/PageContainer";
import Header from "./components/navbar/Header";
import Departures from "./pages/Departures";
import Arrivals from "./pages/Arrivals";

function App() {
  return (
    <div>
      <Header></Header>
      <PageContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/departures" element={<Departures />} />
            <Route path="/arrivals" element={<Arrivals />} />
          </Routes>
        </Router>
      </PageContainer>
    </div>
  );
}

export default App;
