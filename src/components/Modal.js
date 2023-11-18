// Modal.js
import React from "react";

const Modal = ({ driver, onClose }) => {
  const columns = ["passageThroughCurves", "Braking", "Reaction", "Control", "Touch", "Adaptability", "Overtaking", "Defending", "accuracy", "total"];

  return (
    <div className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{driver.Name}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          {columns.map(column => (
              <p key={column}>{`${column.charAt(0).toUpperCase() + column.slice(1)}: ${driver[column]}`}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
