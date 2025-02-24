import React from "react";

const Popup = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
