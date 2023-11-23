import React, { useEffect, useState } from "react";

function AverageConstructorStandings() {
  const [backendData, setBackendData] = useState([]);
  const [averagePoints, setAveragePoints] = useState([]);
const [averagePosition, setAveragePosition] = useState([]);
const[averageWins, setAverageWins] = useState([]);
  useEffect(() => {
    fetch("/api/constructoraverage")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBackendData(data.data);
        setAveragePoints(data.averagePoints);
        setAveragePosition(data.averagePosition);
        setAverageWins(data.averageWins);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {backendData.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
            <div>
  <h2>Averages:</h2>
  {averagePoints && (
    <>
      <p>Average Points: {averagePoints}</p>
      <p>Average Position: {averagePosition}</p>
      <p>Average Wins: {averageWins}</p>
    </>
  )}
</div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Race ID</th>
                <th>Constructor ID</th>
                <th>Points</th>
                <th>Position</th>
                <th>Wins</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {backendData.map((item, index) => (
                <tr key={index}>
                  <td>{item.raceId}</td>
                  <td>{item.constructorId}</td>
                  <td>{item.Points}</td>
                  <td>{item.Position}</td>
                  <td>{item.Wins}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AverageConstructorStandings;
