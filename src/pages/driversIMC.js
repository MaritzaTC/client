import React, { useEffect, useState } from "react";
import BMIPhoto from '../Imagenes/BPIPhoto.jpg'
function DriversImc() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api/driversimc")
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
        <p  >Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
          <h2><center> Drivers BMI</center></h2>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Height</th>
                <th>Weight</th>
                <th>IMC</th>
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
          <div><center> <img src={BMIPhoto} alt="logo" width="895" height="" /></center></div>
        </div>
      )}
    </div>
  );
}

export default DriversImc;
