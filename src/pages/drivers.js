import React, { useEffect, useState } from "react";
import "./drivers.css";

function Drivers() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api/drivers")
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
          <td>
            <button className="btn-link">
              <img src="${data[i].photoUrl}" alt="${data[i].Name}" />
            </button>
          </td>
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
        <div className="container mt-4 shado-lg p3 mb-5 bg-body rounded"> 
        <h2><center>Skill Drivers</center></h2>
        <h1><center>2023</center></h1>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Driver</th>
                <th>PPC</th>
                <th>FRE</th>
                <th>REA</th>
                <th>CTR</th>
                <th>TAC</th>
                <th>ADP</th>
                <th>ADE</th>
                <th>DEF</th>
                <th>PRE</th>
                <th>GEN</th>
              </tr>
            </thead>
            <tbody id="tbody"></tbody>
          </table> 
        </div>
      )}
    </div>
  );
}

export default Drivers;
