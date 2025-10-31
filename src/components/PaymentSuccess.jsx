import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="payment-bg min-h-screen flex flex-col justify-center items-center gap-15">
      <h1 className="text-center p-5 text-white font-extrabold text-3xl">Payment Success</h1>
      <img
        src="https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif"
        alt="Payment success gif"
        className="w-50 h-50 object-cover rounded-full"
      />
    </div>
  );
};

export default PaymentSuccess;
