import React, { useEffect, useState } from "react";
import Alain from '../Imagenes/Alain Prost.jpg'
function DriversStandings() {
  const [driverWithHighestWinRate, setDriverWithHighestWinRate] = useState({});
  const [driverStats, setDriverStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  useEffect(() => {
    fetch("/api/driverstandings")
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
          <h2>Driver with highest win rate</h2>
          <div className="table-responsive-lg">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
               <th>Driver</th>
                <th>Driver Id</th>
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
                <td>{driverWithHighestWinRate.winRate}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div><center> <img src={Alain} alt="logo" width="895" height="" /></center></div>
        </div>
      )}
      {Object.keys(driverStats).length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2>Driver Stats</h2>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Driver Id</th>
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
                  <td>{driver.winRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
