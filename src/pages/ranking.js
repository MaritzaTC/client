import React, { useEffect, useState } from "react";
import CircuitsPhoto from '../Imagenes/Circuits.jpg'
import CicuitsPhotoFatal  from '../Imagenes/fatalAccidents.jpg'
import "../pages/drivers.css";
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
  const [backendData3, setBackendData3] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  useEffect(() => {
    fetchRankingData(`${process.env.REACT_APP_API_URL}/api/rankingfirst`).then((data) => {
      setBackendData1(data);
    });

    fetchRankingData(`${process.env.REACT_APP_API_URL}/api/rankings`).then((data) => {
      setBackendData2(data);
    });
    fetchRankingData(`${process.env.REACT_APP_API_URL}/api/rankingsfaltalaccident`).then((data) => {
      setBackendData3(data);
    });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentbackendData2 = backendData2.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
        <div>
        {(backendData1.length === 0 && currentbackendData2.length === 0 && backendData3.length === 0 ) ? (
        <p>Loading</p>
      ) : (
        <div className="container-fluid mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <div className="table-responsive-lg">
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
          <div><center> <img src={CircuitsPhoto} alt="logo" width="79%" height="" /></center></div>
          <div class="card-body">
    <h2 class="card-title"> The careers with the most completed results </h2>
    <p class="card-text">The query will give you the careers that have the highest number of completed outcomes. This could indicate the success of those careers in terms of completion.</p>
  </div>
          </div>
        </div>
      )} 
        </div>
        <div>
        {(backendData1.length === 0 && currentbackendData2.length === 0 && backendData3.length === 0 ) ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <div className="table-responsive-lg">
          <h2>
            <center>Fatal Accident</center>
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
            {backendData3.map((item, index) => (
                <tr key={`data3_${index}`}>
                  <td>{item.racesId}</td>
                  <td>{item.name}</td>
                  <td>{item.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div><center> <img src={CicuitsPhotoFatal} alt="logo" width="79%" height="" /></center></div>
          </div>
          <div class="card-body">
   
    <p class="card-text">The query will give you the careers that have the highest number of completed outcomes. This could indicate the success of those careers in terms of completion.</p>
  </div>
          <div>
          <h2><h1 className="text"><span className="badge text-bg-danger-custom">Fatal Accidents</span></h1>
            <h2>Race 474</h2>
            <h3 className="text"><span className="badge text-bg-dark">Death of Riccardo Paletti</span></h3>
          </h2>
          <iframe
            width="100%"
            height="415"
            src="https://www.dailymotion.com/embed/video/x8b5mr8"
            frameBorder="0"
            allowFullScreen
            title="Fatal Accident Video"
          ></iframe>
        </div>
        <div class="card">

</div>
        <div>
      <h2>
            <h2>Race 604</h2>
            <h3 className="text"><span className="badge text-bg-dark">Death of Helmuth Koinigg</span></h3>

      </h2>
      <iframe
        width="100%"
        height="415"
        src="https://www.youtube.com/embed/Y1RK9gwehxM"
        frameBorder="0"
        allowFullScreen
        title="Fatal Accident Video Profile"
      ></iframe>
    </div>
    <div>
      <h2>
            <h2>Race 652</h2>
            <h3 className="text"><span className="badge text-bg-dark">Death of Jochen Rindt</span></h3>
      </h2>
      <iframe
        width="100%"
        height="415"
        src="https://www.youtube.com/embed/ONON9La3Gm0"
        frameBorder="0"
        allowFullScreen
        title="Race 652 Video"
      ></iframe>
    </div>
        </div>
      )} 
        </div>
        <div className="table-responsive-lg">
        {(backendData1.length === 0 && currentbackendData2.length === 0 && backendData3.length === 0) ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2>
            <center>RACES COMPLETED FINALLY</center>
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
