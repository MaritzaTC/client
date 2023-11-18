import React, { useEffect, useState } from "react";

function Correlation() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api/drivers/correlation/:id")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from server:", data);
        setBackendData(data.data); // Aquí accede a la propiedad 'data' de la respuesta
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
      body = `<tr><td colSpan="3">No data available</td></tr>`;
    } else {
      return data.map((item, index) => (
        <tr key={index}>
          <td>{item.Age}</td>
          <td>{item.Wins}</td>
          <td>{item.correlationForAll}</td>
        </tr>
      ));
    }

    const tbody = document.querySelector('#tbody');
    if (tbody) {
        tbody.innerHTML = '';
      tbody.innerHTML = body;
    }
  };

  return (
    <div>
      {backendData.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Age</th>
                <th>Wins</th>
                <th>Correlation</th>
              </tr>
            </thead>
            <tbody>{showData(backendData)}</tbody>
          </table>
          <p>Correlation for All: {backendData.length > 0 ? backendData[0].correlationForAll : 'N/A'}</p>
          <p>Correlation for Page: {backendData.length > 0 ? backendData[0].correlationForPage : 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default Correlation;
