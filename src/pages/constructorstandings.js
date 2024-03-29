import React, { useEffect, useState } from "react";
import BrawnPhoto from '../Imagenes/brawn.jpg'
import '../pages/drivers.css'
function ConstructorStandings() {
  const [constructorWithHighestWinRate, setConstructorWithHighestWinRate] = useState({});
  const [constructorStats, setconstructorStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/constructorstandings`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setConstructorWithHighestWinRate(data.constructorWithHighestWinRate);
        setconstructorStats(data.constructorStats);
        console.log(data.constructorStats);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConstructorStats = constructorStats.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {Object.keys(constructorWithHighestWinRate).length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2><center>Constructor with highest win rate</center></h2>
          <div className="table-responsive-lg">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
               <th>Id</th>
                <th>Constructor Name</th>
                <th>Total Wins</th>
                <th>Total Circuits</th>
                <th>Win Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr key={constructorWithHighestWinRate.driverId}>
              <td>{constructorWithHighestWinRate.constructorId}</td>
                <td>{constructorWithHighestWinRate.constructorName}</td>
                <td>{constructorWithHighestWinRate.totalWins}</td>
                <td>{constructorWithHighestWinRate.totalCircuits}</td>
                <td>{constructorWithHighestWinRate.winRate.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div><center> <img src={BrawnPhoto} alt="logo" width="90%" height="" /></center></div>
          <div>
          <iframe
            width="100%"
            height="415"
            src="https://www.youtube.com/embed/_PtFkqcMqLY"
            frameBorder="0"
            allowFullScreen
            title="Fatal Accident Video"
          ></iframe>
        </div>
        </div>
      )}
      {Object.keys(constructorStats).length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2>Constructor Stats</h2>
          <div className="table-responsive-lg">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
              <th>Id</th>
                <th>Constructor Name</th>
                <th>Total Wins</th>
                <th>Total Circuits</th>
                <th>Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {currentConstructorStats.map((driver) => (
                <tr key={driver.constructorId}>
                  <td>{driver.constructorId}</td>
                  <td>{driver.constructorName}</td>
                  <td>{driver.totalWins}</td>
                  <td>{driver.totalCircuits}</td>
                  <td>{driver.winRate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(constructorStats.length / itemsPerPage) }, (_, i) => (
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

export default ConstructorStandings;
