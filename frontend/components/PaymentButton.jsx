import React from 'react';
import axios from 'axios';

const PaymentButton = ({user}) => {
  const handlePayment = async () => {
    const { data: orderData } = await axios.post('http://localhost:3000/api/payment/create-order', {
      amount: 500, // Change this dynamically if needed
    });

    const { data: keyData } = await axios.get('http://localhost:3000/api/payment/get-key');

    console.log("🟢 Razorpay Key from backend:", keyData.key);
    const options = {
      key: keyData.key, // Replace with your actual Razorpay key
      amount: orderData.order.amount,
      currency: 'INR',
      name: 'Your E-Commerce',
      description: 'Test Transaction',
      order_id: orderData.order.id,
      handler: function (response) {
        console.log('✅ Payment Successful:', response);
        // Optional: Send response to backend for verification
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contactNumber,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <button
      onClick={handlePayment}
      className='mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 w-1/3'
    >
      Pay Now
    </button>
  );
};

export default PaymentButton;
