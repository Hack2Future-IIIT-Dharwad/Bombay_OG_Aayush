import React from 'react'
import landing from '../assets/Home/landing.png'
export default function Landing() {
    return (
        <div className='text-white mt-14'>
            <div className='h-[30rem] flex items-center justify-between mt-6'>
                <div className='w-[50%] flex flex-col gap-4 items-start'>
                    <h1 className='text-6xl font-bold'>Achieve MLOps Automation Effortlesly</h1>
                    <p className='text-gray-500 font-semibold'>Automate model selection and data analysis with SmartMLOps</p>
                    <button className='bg-white text-black p-2 rounded-md'>Get Started</button>
                </div>

                <div>
                    <svg className='hidden md:block' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="500" height="500">
                        {/* Define the clipPath using the blob path */}
                        <defs>
                            <clipPath id="blobClip">
                                <path
                                    d="M20.2,-35.4C26.7,-31.3,32.8,-26.9,35.9,-20.9C39,-14.9,39.1,-7.5,38.8,-0.1C38.6,7.2,37.9,14.4,34.7,20.1C31.5,25.9,25.8,30.3,19.5,34.1C13.3,38,6.7,41.3,0.1,41.1C-6.4,40.9,-12.8,37.1,-18.9,33.1C-24.9,29.2,-30.6,25,-34.9,19.5C-39.3,13.9,-42.4,7,-42.4,0C-42.4,-7,-39.3,-13.9,-34.9,-19.4C-30.5,-24.9,-24.7,-28.9,-18.7,-33.3C-12.7,-37.6,-6.3,-42.3,0.3,-42.8C6.9,-43.3,13.8,-39.5,20.2,-35.4Z"
                                    transform="translate(50 50)"
                                />
                            </clipPath>

                            {/* Define the filter for the inner blur effect */}
                            <filter id="innerBlur">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                                <feOffset in="blur" dx="0" dy="0" />
                                <feComposite in="SourceGraphic" in2="blur" operator="atop" />
                            </filter>
                        </defs>

                        {/* Apply the mask with blur effect */}
                        <mask id="blurMask">
                            <path
                                d="M20.2,-35.4C26.7,-31.3,32.8,-26.9,35.9,-20.9C39,-14.9,39.1,-7.5,38.8,-0.1C38.6,7.2,37.9,14.4,34.7,20.1C31.5,25.9,25.8,30.3,19.5,34.1C13.3,38,6.7,41.3,0.1,41.1C-6.4,40.9,-12.8,37.1,-18.9,33.1C-24.9,29.2,-30.6,25,-34.9,19.5C-39.3,13.9,-42.4,7,-42.4,0C-42.4,-7,-39.3,-13.9,-34.9,-19.4C-30.5,-24.9,-24.7,-28.9,-18.7,-33.3C-12.7,-37.6,-6.3,-42.3,0.3,-42.8C6.9,-43.3,13.8,-39.5,20.2,-35.4Z"
                                transform="translate(50 50)"
                                fill="white"
                                filter="url(#innerBlur)"
                            />
                        </mask>

                        {/* Image element that uses the clipPath and mask */}
                        <image
                            xlinkHref={landing}
                            width="100"
                            height="100"
                            clipPath="url(#blobClip)"
                            mask="url(#blurMask)"
                            transform="translate(0 0)"
                        />
                    </svg>

                </div>
            </div>

        </div>
    )
}
