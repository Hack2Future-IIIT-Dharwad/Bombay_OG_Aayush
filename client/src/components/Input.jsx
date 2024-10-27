import React, { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Gif from "../assets/Home/Input2.gif";
import '../CSS_files/Input.css';
import axios from 'axios';
import Loader from './Load'; // Adjust the import based on your file structure

const Input = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [primaryKey, setPrimaryKey] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const [visualizationComplete, setVisualizationComplete] = useState(false); // State for visualization

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append('file', file);
    formData.append('primary_key', primaryKey);
    formData.append('target_variable', targetColumn);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const response = await axios.get('http://localhost:5000/train_model');

      const bestModel = response.data['best model'];
      const metrics = response.data['metrics'];
      const modelType = response.data['model_type'];

      console.log("Best Model:", bestModel);
      console.log("Metrics:", metrics);
      console.log("Model Type:", modelType);

      // After visualization is complete, set the state
      setVisualizationComplete(true);
      
      // Only move to the next page if the loader is complete
      if (visualizationComplete) {
        setTimeout(() => {
          setLoading(false); // Stop loading
          navigate('/options'); // Redirect to options page
        }, 1000); // Short delay to visualize completion
      }
      
    } catch (error) {
      console.error('Error uploading the file', error);
      alert('There was an issue uploading the file');
      setLoading(false); // Stop loading on error
    }
  };

  const handleLoaderComplete = () => {
    if (visualizationComplete) {
      navigate('/options'); // Redirect to options page if visualization is complete
    }
  };

  return (
    <div className="input-form-body w-full h-screen bg-black flex flex-col items-center justify-center" ref={ref}>
      {loading ? (
        <Loader onComplete={handleLoaderComplete} /> // Pass onComplete function to Loader
      ) : (
        <>
          <div className="container mx-auto w-full h-[18vw] flex flex-col justify-center items-center mb-5 bg-cover bg-center" style={{ backgroundImage: 'url(/bg3.webp)' }}>
            <h1 className="text-white text-4xl font-bold py-2">Elevate Your Machine<span className="text-pink-500"> Learning </span>Capabilities</h1>
            <p className="text-white text-lg max-w-2xl text-center">
              Harness the power of our cutting-edge machine learning technology to revolutionize your business operations and stay ahead.
            </p>
          </div>

          <div className="w-4/5 max-w-9xl flex flex-wrap gap-10 mt-5">
            <div className="input-left-form flex-1 text-white">
              <h1 className="input-left-form-head-font text-2xl mb-2">Unlock the Future of Machine Learning</h1>
              <p className="input-left-form-text-font text-gray-400 mb-2">Discover the Power of ML-Ops: Effortlessly Manage and Scale Your</p>
              <p className="input-left-form-text-font text-gray-400 mb-4">Propel Your Business Forward with Our Innovative ML Solutions</p>
              <img src={Gif} alt="Ai animation" className="w-4/5 h-auto" />
            </div>

            <div className="input-right-form flex-1 bg-white p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-20 border border-white border-opacity-30 text-white">
              <h2 className="input-form-right-get_started text-2xl font-semibold mb-6">Get Started</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="csvFile" className="block text-lg font-medium mb-2">Upload </label>
                  <input 
                    type="file" 
                    id="csvFile" 
                    name="file" 
                    required
                    onChange={handleFileChange}
                    className="input-form-right-input_box w-full p-3 rounded-lg bg-gray-800 bg-opacity-40 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="primaryKey" className="block text-lg font-medium mb-2">Primary Key Column</label>
                  <input
                    type="text" 
                    id="primaryKey" 
                    name="primary_key" 
                    value={primaryKey}
                    onChange={(e) => setPrimaryKey(e.target.value)}
                    className="input-form-right-input_box w-full p-3 rounded-lg bg-gray-800 bg-opacity-40 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="targetColumn" className="block text-lg font-medium mb-2">Target Column</label>
                  <input
                    type="text" 
                    id="targetColumn" 
                    name="target_column" 
                    value={targetColumn}
                    onChange={(e) => setTargetColumn(e.target.value)}
                    className="input-form-right-input_box w-full p-3 rounded-lg bg-gray-800 bg-opacity-40 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full mt-5 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white transition duration-150"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default Input;
