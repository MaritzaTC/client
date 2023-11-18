import React, { useEffect, useState } from "react";

function DriversStandings() {
  const [driverWithHighestWinRate, setDriverWithHighestWinRate] = useState({});
  const [driverStats, setDriverStats] = useState({});
  useEffect(() => {
    fetch("/api/driverstandings")
      .then((response) => response.json())
      .then((data) => {
        setDriverWithHighestWinRate(data.driverWithHighestWinRate);
        setDriverStats(data.driverStats);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {Object.keys(driverWithHighestWinRate).length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2>Driver with highest win rate</h2>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>driverName</th>
                <th>driverId</th>
                <th>totalWins</th>
                <th>totalRaces</th>
                <th>winRate</th>
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
      )}
      {Object.keys(driverStats).length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2>Driver Stats</h2>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>driverName</th>
                <th>driverId</th>
                <th>totalWins</th>
                <th>totalRaces</th>
                <th>winRate</th>
              </tr>
            </thead>
            <tbody>
             <tr key={driverStats.driverId}>
              <td>{driverStats.driverId}</td>
              <td>{driverStats.driverName}</td>
              <td>{driverStats.totalWins}</td>
              <td>{driverStats.totalRaces}</td>
              <td>{driverStats.winRate}</td>
             </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DriversStandings;