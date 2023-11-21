import React, { useEffect, useState } from "react";
import CircuitsPhoto from '../Imagenes/Circuits.jpg'
function fetchRankingData(apiEndpoint) {
  return fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data from server:", data);
      return data.constructorFinally;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return [];
    });
}

function Rankings() {
  const [backendData1, setBackendData1] = useState([]);
  const [backendData2, setBackendData2] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  useEffect(() => {
    fetchRankingData("/api/rankingfirst").then((data) => {
      setBackendData1(data);
    });

    fetchRankingData("/api/rankings").then((data) => {
      setBackendData2(data);
    });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentbackendData2 = backendData2.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
        <div>
        {(backendData1.length === 0 && currentbackendData2.length === 0) ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2>
            <center>Ranking first five</center>
          </h2>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Race ID</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {backendData1.map((item, index) => (
                <tr key={`data1_${index}`}>
                  <td>{item.racesId}</td>
                  <td>{item.name}</td>
                  <td>{item.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div><center> <img src={CircuitsPhoto} alt="logo" width="895" height="" /></center></div>
        </div>
      )} 
        </div>
        <div>
        {(backendData1.length === 0 && currentbackendData2.length === 0) ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2>
            <center>RACES COMPLETED</center>
          </h2>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Race ID</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentbackendData2.map((item, index) => (
                <tr key={`data2_${index}`}>
                  <td>{item.racesId}</td>
                  <td>{item.name}</td>
                  <td>{item.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(backendData2.length / itemsPerPage) }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button onClick={() => paginate(i + 1)} className="page-link" style={{ color: 'white', backgroundColor: currentPage === i + 1 ? '#EA0303' : 'black' }}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
        </div>
     
    </div>
  );
}

export default Rankings;
