import React from 'react'

import Hourglass from "../assets/Home/sand-clock.png";
import Arrow from "../assets/Home/arrow.png";
import MagnifyingGlass from "../assets/Home/magnifyingGlass.png";
import Linechart from "../assets/Home/line-chart.png";
import downArrow from "../assets/Home/downward-arrow.png";

export default function Challenges() {
    return (
        <div className='text-white flex flex-col items-center mt-28'>
            <h1 className='text-4xl font-bold'>The Challenges of Machine Learning</h1>

            {/* challenges */}
            <div className='mt-14 flex'>
                <div className='flex flex-col items-center gap-2'>
                    <img src={Hourglass} alt='hourglass' className='h-12' />
                    <p className='font-semibold'>Time-Consuming Model Selection</p>
                </div>

                <img src={Arrow} alt='arrow' className='w-28 h-16' />

                <div className='flex flex-col items-center gap-2'>
                    <img src={MagnifyingGlass} alt='hourglass' className='h-12' />
                    <p className='font-semibold'>Complex Data Analysis</p>
                </div>

                <img src={Arrow} alt='arrow' className='w-28 h-16' />

                <div className='flex flex-col items-center gap-2'>
                    <img src={Linechart} alt='hourglass' className='h-12' />
                    <p className='font-semibold'>High Failure Rate Of AI Projects</p>
                </div>
            </div>

            {/* easier waya line */}
            <div className='flex mt-20 gap-2 items-center'>
                <img src={downArrow} alt="arrow" className='h-6 w-6'/>
                <span className='text-[#747474] font-semibold'>there is a easier way</span></div>
        </div>
    )
}
