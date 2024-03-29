import React, { useEffect, useState } from "react";
import Alain from '../Imagenes/Alain Prost.jpg'
import '../pages/drivers.css'
function DriversStandings() {
  const [driverWithHighestWinRate, setDriverWithHighestWinRate] = useState({});
  const [driverStats, setDriverStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/driverstandings`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDriverWithHighestWinRate(data.driverWithHighestWinRate);
        setDriverStats(data.driverStats);
        console.log(data.driverStats);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDriverStats = driverStats.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {Object.keys(driverWithHighestWinRate).length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2><center>Driver with highest win rate</center></h2>
          <div className="table-responsive-lg">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
               <th>Driver</th>
                <th>Id</th>
                <th>Total Wins</th>
                <th>Total Races</th>
                <th>WinRate</th>
              </tr>
            </thead>
            <tbody>
              <tr key={driverWithHighestWinRate.driverId}>
                <td>{driverWithHighestWinRate.driverName}</td>
                <td>{driverWithHighestWinRate.driverId}</td>
                <td>{driverWithHighestWinRate.totalWins}</td>
                <td>{driverWithHighestWinRate.totalRaces}</td>
                <td>{driverWithHighestWinRate.winRate.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div><center> <img src={Alain} alt="logo" width="95%" height="" /></center></div>
          <div>
          <iframe
            width="100%"
            height="415"
            src="https://www.youtube.com/embed/3Q-KzoHumVI"
            frameBorder="0"
            allowFullScreen
            title="Fatal Accident Video"
          ></iframe>
        </div>
        </div>
      )}
      {Object.keys(driverStats).length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2>Driver Stats</h2>
          <div className="table-responsive-lg">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Id</th>
                <th>Total Wins</th>
                <th>Total Races</th>
                <th>WinRate</th>
              </tr>
            </thead>
            <tbody>
              {currentDriverStats.map((driver) => (
                <tr key={driver.driverId}>
                  <td>{driver.driverName}</td>
                  <td>{driver.driverId}</td>
                  <td>{driver.totalWins}</td>
                  <td>{driver.totalRaces}</td>
                  <td>{driver.winRate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(driverStats.length / itemsPerPage) }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button onClick={() => paginate(i + 1)} className="page-link" style={{color: 'white',
                      backgroundColor: currentPage === i + 1 ? '#EA0303' : 'black',}}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriversStandings;
