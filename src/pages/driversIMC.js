import React, { useEffect, useState } from "react";
import BMIPhoto from "../Imagenes/BPIPhoto.jpg";
function DriversImc() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/driversimc`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from server:", data);
        setBackendData(data.data);
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
          <h2>
            <center> Drivers BMI</center>
          </h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>BMI</th>
                </tr>
              </thead>
              <tbody>
                {backendData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td>{item.Height}</td>
                    <td>{item.Weight}</td>
                    <th>{item.IMC}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <center>
              {" "}
              <img src={BMIPhoto} alt="logo" width="90%" height="" />
            </center>
          </div>
          <div class="card-body">
            <p class="card-text">
              In Formula 1, weight is crucial for both the car's performance and
              the health and balance of the driver. The International Automobile
              Federation (FIA) sets a minimum weight for both the car and the
              driver. Teams use lightweight and sturdy materials but must
              balance the weight to comply with regulations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriversImc;
