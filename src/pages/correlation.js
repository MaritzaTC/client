import React, { useEffect, useState } from "react";
import CorrelationPhoto from '../Imagenes/CorrelationAgeAndWins.jpg'
function Correlation() {
  const [backendData, setBackendData] = useState([]);
  const [correlationForAll, setCorrelationForAll] = useState(null);
  const [correlationForPage, setCorrelationForPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/drivers/correlation/:id`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from server:", data);
        setBackendData(data.data); // Accede a la propiedad 'data' de la respuesta
        setCorrelationForAll(data.correlationForAll);
        setCorrelationForPage(data.correlationForPage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBackendData = backendData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {backendData.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h1 className="text"><span className="badge text-bg-danger-custom">Correlation: Age and wins</span></h1>
          {correlationForAll !== null && (
            <p>
              <strong>Correlation For All: </strong>
              {correlationForAll}
            </p>
          )}
          <div><center> <img src={CorrelationPhoto} alt="logo" width="90%" height="" /></center></div>
          {correlationForPage !== null && (
            <p><strong>Correlation First Page: </strong>{correlationForPage}</p>
          )}
          <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Age</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {currentBackendData.map((driver) => (
                <tr key={driver.driverId}>
                  <td>{driver.Age}</td>
                  <td>{driver.Wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(backendData.length / itemsPerPage) }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button onClick={() => paginate(i + 1)} className="page-link" style={{
                    color: 'white',
                    backgroundColor: currentPage === i + 1 ? '#EA0303' : 'black',
                  }}>
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

export default Correlation;
