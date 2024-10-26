import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Gif from "../assets/Home/Input2.gif";

const Input = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Estimate submitted!');
    navigate('/stats');
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center" ref={ref}>
      <div className="container mx-auto w-full h-[18vw] flex flex-col justify-center items-center mb-5 bg-cover bg-center" style={{ backgroundImage: 'url(/bg3.webp)' }}>
        <h1 className="text-white text-4xl font-bold py-2">Elevate Your Machine<span className="text-pink-500"> Learning </span>Capabilities</h1>
        <p className="text-white text-lg max-w-2xl text-center">
          Harness the power of our cutting-edge machine learning technology to revolutionize your business operations and stay ahead.
        </p>
      </div>

      <div className="bg-black w-4/5 max-w-7xl rounded-lg shadow-md p-5 flex flex-wrap gap-10 mt-5">
        <div className="flex-1 text-white">
          <h1 className="text-2xl mb-2">Unlock the Future of Machine Learning</h1>
          <p className="text-gray-400 mb-2">Discover the Power of ML-Ops: Effortlessly Manage and Scale Your</p>
          <p className="text-gray-400 mb-4">Propel Your Business Forward with Our Innovative ML Solutions</p>
          <img src={Gif} alt="Ai animation" className="w-4/5 h-auto" />
        </div>

        <div className="flex-1 bg-white text-black p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Get Started</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="csvFile" className="block font-semibold text-blue-500 mb-2">Upload CSV File</label>
              <input type="file" id="csvFile" name="csvFile" accept=".csv" required className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="primaryKey" className="block font-semibold text-blue-500 mb-2">Primary Key Column</label>
              <input type="text" id="primaryKey" name="primaryKey" required className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="targetColumn" className="block font-semibold text-blue-500 mb-2">Target Column</label>
              <input type="text" id="targetColumn" name="targetColumn" required className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              Let's Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Input;