import React, { useEffect, useState } from "react";
import CorrelationPhoto from "../Imagenes/CorrelationPoinstAndPodiums.jpg";
function Pointandpodios() {
  const [backendData, setBackendData] = useState([]);
  const [correlation, setCorrelation] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/drivers/pointandpodios`)
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
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h1 className="text">
            <span className="badge text-bg-danger-custom">
              Correlation Points And Podiums
            </span>
          </h1>
          {correlation !== null && (
            <p>
              <strong>Correlation: </strong>
              {correlation}
            </p>
          )}
          <div>
            <center>
              {" "}
              <img src={CorrelationPhoto} alt="logo" width="90%" height="" />
            </center>
          </div>
          <div className="table-responsive-lg">
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
          <div class="card-body">
            <p class="card-text">
              Moderate Positive Correlation: The correlation value is 0.5842,
              indicating a moderate positive correlation between points and
              podiums. In this context, a positive correlation suggests that as
              the number of points obtained by a driver increases, the number of
              podium finishes also tends to increase.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pointandpodios;
