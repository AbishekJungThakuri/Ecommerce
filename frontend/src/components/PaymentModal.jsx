import React, { useState } from "react";

const PaymentModal = ({ isOpen, onClose, onSelectPayment }) => {
  if (!isOpen) return null;

  const paymentMethods = [
    { id: "esewa", label: "eSewa" },
    { id: "khalti", label: "Khalti" },
    { id: "mobile_banking", label: "Mobile Banking" },
    { id: "cod", label: "Cash on Delivery" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-10">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

        <div className="flex flex-col gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => onSelectPayment(method.id)}
              className="w-full border rounded-md p-3 text-left hover:bg-gray-100 transition"
            >
              {method.label}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
