import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Drivers from "./pages/drivers";
import Correlation from "./pages/correlation";
import CorrelationPointsAndPodios from "./pages/pointAndPodios";
import DriversStandigs from "./pages/driverstandings";
import ConstructorStandings from "./pages/constructorstandings";
import DriverImc from "./pages/driversIMC";
import DriverComparison from "./pages/comparison";
import Rankings from "./pages/ranking"
import logo from './Imagenes/logo.png';
import CarsPhoto from './Imagenes/cars.jpg'
function App() {
  return (
    <div className="App">
      <nav class="navbar bg-dark border-bottom border-body" style={{backgroundColor: '#e3f2fd'}}>
        <div className="container-fluid">
          <img src={logo} alt="logo" width="100" height="50" />
      <h1 className="navbar-brand" style={{color: "#e3f2fd"}}>Formula 1</h1>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <Router>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
        <li><Link to={"/rankingfirst"} style={{ color: "white", textDecoration: "none" }}> Rankings</Link></li>
          <li ><Link style={{ color: "white", textDecoration: "none" }} to="/driverstandigs">Driver Standings</Link> </li>
          <li ><Link style={{ color: "white", textDecoration: "none" }} to='/constructorstandings'k>Constructor Standings</Link></li>
          <li ><Link style={{ color: "white", textDecoration: "none" }} to="/drivers">Drivers Skills </Link></li>
          <li ><Link style={{ color: "white", textDecoration: "none" }} to='/driverscomparison'>Comparison</Link></li>
          <li ><Link style={{ color: "white", textDecoration: "none" }} to="/driversimc">Drivers BMI</Link></li>
          <li ><Link style={{ color: "white", textDecoration: "none" }} to="/driverCorrelation">Correlation: Points and Podiums</Link></li>
          <li ><Link style={{ color: "white", textDecoration: "none" }} to="/driverageandwins">Correlation: Age and Wins</Link></li>
        </ul>
        <Routes>
          <Route path="/rankingfirst" element={<Rankings/>}></Route>
          <Route path="/driverscomparison" element={<DriverComparison/>}></Route>
          <Route path="/driversimc" element={<DriverImc/>}></Route>
          <Route path="/constructorstandings" element={<ConstructorStandings />} />
          <Route path="/driverstandigs" element={<DriversStandigs />} />
          <Route path="/driverCorrelation" element={<CorrelationPointsAndPodios />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/driverageandwins" element={<Correlation />} />
        </Routes>
      </Router>
      </div>
      </div>
      </nav>
      <div><center> <img src={CarsPhoto} alt="logo" width="895" height="" /></center></div>
      <footer style={{ backgroundColor: '#212529', color: 'white' }}>
  <center>
    <p>&copy; 2023 Universidad de Antioquia | Desarrollado por: Ana María Vega Angarita y Maritza Tabarez Cárdenas | Estructura de Datos 2023-2 </p>
  </center>
</footer>

    </div>
  );
}

export default App;
