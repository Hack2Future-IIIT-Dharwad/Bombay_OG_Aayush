import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Options from './pages/Options';
import Stats from './pages/Stats';
import Graph from './pages/Graph';
import Testing from './components/Testing'
import Query from './pages/Query'

export default function App() {
  return (
    <div className='bg-black px-36 p-5'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Options" element={<Options />} />
        <Route path="/Stats" element={<Stats/>}/>
        <Route path="/graph" element={<Graph/>}/>
        <Route path="/testing" element={<Testing/>}/>
        <Route path="/query" element={<Query/>}/>
      </Routes>
    </div>
  )
}
