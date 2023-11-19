import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Drivers from "./pages/drivers";
import Correlation from "./pages/correlation";
import CorrelationPointsAndPodios from "./pages/pointAndPodios";
import DriversStandigs from "./pages/driverstandings";
import ConstructorStandings from "./pages/constructorstandings";
function App() {
  return (
    <div className="App">
      <h1>Formula 1</h1>

      <Router>
        <ul> 
          <li><Link to="/driverstandigs">Driver Standings</Link> </li>
          <li><Link to='/constructorstandings'k>Constructor Standings</Link></li>
          <li><Link to="/">Correlation: Age and Wins</Link></li>
          <li><Link to="/drivers">Skill Drivers</Link></li>
          <li><Link to="/driverCorrelation">Correlation: Points and Podiums</Link></li>
        </ul>
        <Routes>
          <Route path="/constructorstandings" element={<ConstructorStandings />} />
          <Route path="/driverstandigs" element={<DriversStandigs />} />
          <Route path="/driverCorrelation" element={<CorrelationPointsAndPodios />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/" element={<Correlation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
