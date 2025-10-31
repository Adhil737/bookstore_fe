import React from "react";

const PaymentFailure = () => {
  return (
    <div className="payment-bg min-h-screen flex flex-col justify-center items-center gap-15">
      <h1 className="text-center p-5  text-white font-extrabold text-3xl">Payment Failed</h1>
      <img className="w-50 h-50 rounded-full " src="https://www.bhoomiias.in/homeassets/images/failed.gif" alt="payment failed gif" />
    </div>
  );
};

export default PaymentFailure;
