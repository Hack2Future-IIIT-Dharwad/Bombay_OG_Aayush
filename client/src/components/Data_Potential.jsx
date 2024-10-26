import React from 'react'

export default function Data_Potential() {
    const features = [
        {
            icon: "",
            title: "Automated Model Selection",
            desc: "Upload your dataset and let SmartMLOps automatically identify the best regression or classification model for your data,"
        },

        {
            icon: "",
            title: "Comprehensive Data Analysis",
            desc: "Gain insights with interactive visualizations ske correlation heatmaps, distribution graphs, and feature importance charts."
        },

        {
            icon: "",
            title: "Performance Metrics",
            desc: "Compare multiple models with detailed performance metrics such as accuracy and RMISE to find the best fit."
        },
        {
            icon: "",
            title: "Easy Deployment",
            desc: "Deploy the best-performing model with a single click and download comprehensive reports summarizing model performance."
        },
        {
            icon: "",
            title: "User-Friendly Interface",
            desc: "Navigate through a simple, intuitive interface designed for both experts and beginners in machine learning."
        },
        {
            icon: "",
            title: "Time Efficiency",
            desc: "Save time and effort by automating the tedious aspects of model selection and tuning."
        },
    ]


    return (
        <div className='text-white mt-24'>
            <div className='flex flex-col gap-4'>
                <h1 className='text-4xl font-bold'>Unlock Your Data's Potential</h1>
                <p className='text-gray-500 font-semibold'>MLOpsmakes machine learning accessible and efficient</p>
            </div>

            <div className='flex gap-10 flex-wrap mt-10'>
                {
                    features.map((feature, index) => (
                        <div className='w-[30%] h-[200px] flex gap-3 items-start'>
                            <div className='h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center translate-y-1'>{index + 1}</div>
                            
                            <div className='flex flex-col gap-3 w-[85%]'>
                                <h2 className='font-semibold text-xl'>{feature.title}</h2>
                                <p className='text-sm text-gray-500 font-semibold'>{feature.desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
