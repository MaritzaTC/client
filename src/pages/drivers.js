import React, { useEffect, useState } from "react";
import "./drivers.css";
import DriversPhoto from '../Imagenes/drivers.jpg'

function Drivers() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/drivers`)
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
 
  useEffect(() => {
    showData(backendData);
  }, [backendData]);


  const showData = (data) => {
    console.log("Data from server:", data);
    let body = '';
    if (data.length === 0) {
      body = `<tr><td colSpan="11">No data available</td></tr>`;
    } else {
      // Encontrar el valor máximo en cada columna
      const maxValues = {};
      const columns = ["passageThroughCurves", "Braking", "Reaction", "Control", "Touch", "Adaptability", "Overtaking", "Defending", "accuracy", "total"];
    
      columns.forEach(column => {
        const max = Math.max(...data.map(driver => driver[column]));
        maxValues[column] = max;
      });

      for (let i = 0; i < data.length; i++) {
        body += `<tr key=${i}>
          <td>${data[i].Name}</td>
          ${columns.map(column => {
            const cellValue = data[i][column];
            const isMax = cellValue === maxValues[column];
            return `<td ${isMax ? 'class="max-value"' : ''}>${cellValue}</td>`;
          }).join('')}
         
        </tr>`;
      }
    }

    const tbody = document.querySelector('#tbody');
    if (tbody) {
      tbody.innerHTML = body;
    }
  };

  return (
    <div>
      {backendData.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded"> 
        <h2><center>Drivers Skills</center></h2>
        <h1><center>2023</center></h1>
        <div  className="table-responsive-lg">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Driver</th>
                <th>PTC</th>
                <th>BRA</th>
                <th>REA</th>
                <th>CTR</th>
                <th>TOU</th>
                <th>ADP</th>
                <th>OVER</th>
                <th>DEF</th>
                <th>ACC</th>
                <th >GEN</th>
              </tr>
            </thead>
            <tbody id="tbody"></tbody>
          </table> 
          </div>
          <div class="card-body">
   
   <p class="card-text">PTC=PassageThroughCurves BRA=Braking REA=Reaction CTR=Control TOU=Touch ADP=Adaptability OVER=Overtaking DEF=Defending ACC=Accuracy GEN=General</p>
 </div>
          <div><center> <img src={DriversPhoto} alt="logo" width="90%" height="" /></center></div>
        </div>
      )}
    </div>
  );
}

export default Drivers;
