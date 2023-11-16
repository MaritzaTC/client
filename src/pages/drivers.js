import React, { useEffect, useState } from "react";

function Drivers() {
  const [backendData, setBackendData] = useState([]);
  useEffect(() => {
    fetch("/api/drivers")
      .then((response) => response.json())
      .then((data) => {
        showData(data);
        setBackendData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const showData = (data) => {
    console.log("Data from server:", data);
    let body = '';
    if (data.length === 0) {
      body = `<tr><td colSpan="11">No data available</td></tr>`;
    } else {
      for (let i = 0; i < data.length; i++) {
        body += `<tr>
        <td>${data[i].Name}</td>
        <td>${data[i].passageThroughCurves}</td>
        <td>${data[i].Braking}</td>
        <td>${data[i].Reaction}</td>
        <td>${data[i].Control}</td>
        <td>${data[i].Touch}</td>
        <td>${data[i].Adaptability}</td>
        <td>${data[i].Overtaking}</td>
        <td>${data[i].Defending}</td>
        <td>${data[i].accuracy}</td>
        <td>${data[i].total}</td>
      </tr>` ;
      }
    }
    document.querySelector('tbody').innerHTML = body;
  };

  return (
    <div>
      {backendData.length === 0 ? (
        <p>Loading</p>
      ) : (
        <table>
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
      )}
    </div>
  );
}

export default Drivers;
