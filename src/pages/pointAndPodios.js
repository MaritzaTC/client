import React, { useEffect, useState } from "react";
import CorrelationPhoto from '../Imagenes/CorrelationPoinstAndPodiums.jpg'
function Pointandpodios() {
  const [backendData, setBackendData] = useState([]);
  const [correlation, setCorrelation] = useState(null);

  useEffect(() => {
    fetch("/api/drivers/pointandpodios")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from server:", data);
        setBackendData(data.data);
        setCorrelation(data.correlation);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {backendData.length === 0 ? (
        <p  >Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2>Correlation Points And Podiums</h2>
          {correlation !== null && (
            <p><strong>Correlation: </strong>{correlation}</p>
          )}
          <div><center> <img src={CorrelationPhoto} alt="logo" width="895" height="" /></center></div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Points</th>
                <th>Podiums</th>
              </tr>
            </thead>
            <tbody>
              {backendData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Points}</td>
                  <td>{item.Podiums}</td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </div>
      )}
    </div>
  );
}

export default Pointandpodios;
