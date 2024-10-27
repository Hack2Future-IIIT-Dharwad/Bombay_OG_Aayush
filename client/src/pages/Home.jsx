import React from 'react';
import Navbar from '../components/Navbar';
import Landing from '../components/Landing';
import Challenges from '../components/Challenges';
import MLOps_work from '../components/MLOps_work';
import Data_Potential from '../components/Data_Potential';
import Pricing_FAQ from '../components/Pricing_FAQ';
import Footer from '../components/Footer';
import Input from '../components/Input';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Landing />
      <Challenges />
      <MLOps_work />
      <Data_Potential />
      {/* <Pricing_FAQ /> */}
      <Input />
      <Footer />
    </div>
  );
}
