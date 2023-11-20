import React, { useEffect, useState } from "react";
import "./drivers.css";
function Comparison() {
  const [values, setValues] = useState([]);
  const [selectedPersons, setSelectedPersons] = useState([]);

  useEffect(() => {
    fetch("api/drivers")
      .then((data) => data.json())
      .then((val) => setValues(val))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSelectChange = (e, index) => {
    const selectedValue = e.target.value;
    setSelectedPersons((prevSelectedPersons) => {
      const newSelectedPersons = [...prevSelectedPersons];
      newSelectedPersons[index] = selectedValue;
      return newSelectedPersons;
    });
  };
  const getAvailablePersons = () => {
    return values.filter((person) => !selectedPersons.includes(person.Name));
  };
  const getPersonDetails = () => {

    const maxValues = {};
    const columns = ["Name", "passageThroughCurves", "Braking", "Reaction", "Control", "Touch", "Adaptability", "Overtaking", "Defending", "accuracy", "total"];
    const maxTotal = Math.max(...selectedPersons.map(personName => values.find(person => person.Name === personName).total));
    selectedPersons.forEach((selectedPerson) => {
      const selectedPersonDetails = values.find((person) => person.Name === selectedPerson);
      columns.forEach(column => {
        const currentValue = selectedPersonDetails[column];
        if (!maxValues[column] || currentValue > maxValues[column]) {
          maxValues[column] = currentValue;
        }
      });
    });

    return (
      <div className="container mt-4 shado-lg p-3 mb-5 bg-body rounded">
        <h1 className="text-center"><span class="badge text-bg-dark">Comparison best Driver</span></h1>
        {selectedPersons.map((selectedPerson, index) => {
          const selectedPersonDetails = values.find((person) => person.Name === selectedPerson);

          return (
            <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
              <h4>{selectedPersonDetails.Name}</h4>
                <ul >
                  <li> Name</li>
                  <li  >Passage  Curves</li>
                  <li  >Braking</li>
                  <li  > Reaction</li>
                  <li > Control</li>
                  <li  > Touch</li>
                  <li > Adaptability</li>
                  <li > Overtaking</li>
                  <li  > Defending</li>
                  <li  > Accuracy</li>
                  <li  > Total</li>
                </ul>
              </div>
              <div style={{ flex: 2 }}>
                <h3>Data</h3>
                <ul>
                {columns.map((column, i) => (
                  <li 
                    key={i}
                    className={selectedPersonDetails[column] === maxValues[column] ? 'max-value max-value-color' : ''}
                    style={{ fontWeight: column === 'total' && selectedPersonDetails[column] === maxTotal ? 'bold' : 'normal' }}
                  >
                    {selectedPersonDetails[column]}
                  </li>
                ))}
              </ul>
              </div>
            </div>
          );
        })}
        <div>
  <p className="alert" role="alert" style={{ marginTop: '20px', fontWeight: 'bold', backgroundColor: '#EA0303', color: '#FFFFFF' }}>
    The best driver is {selectedPersons.find(personName => values.find(person => person.Name === personName).total === maxTotal)}
  </p>
</div>

       
      </div>
    );
  };

  return (
    <div className="container mt-4 shado-lg p-3 mb-5 bg-body rounded">
      <div>
        <select class="form-select form-select-lg mb-3" aria-label="Large select example" onChange={(e) => handleSelectChange(e, 0)}>
          <option value="">Select the driver</option>
          {values.map((person, i) => (
            <option key={i} value={person.Name}>
              {person.Name}
            </option>
          ))}
        </select>

        <select class="form-select form-select-lg mb-3" aria-label="Large select example"  onChange={(e) => handleSelectChange(e, 1)}>
        <option value="">Select the driver</option>
          {getAvailablePersons().map((person, i) => (
            <option key={i} value={person.Name}>
              {person.Name}
            </option>
          ))}
        </select>

        {getPersonDetails()}
      </div>
    </div>
  );
  
}

export default Comparison;
