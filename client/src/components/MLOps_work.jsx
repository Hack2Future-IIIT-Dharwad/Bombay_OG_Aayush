import React from 'react'

export default function MLOps_work() {
    const workFlow = [
        {
            id: 1,
            title: "Upload Your Data",
            desc: "Simplify upload your CSV or Excel file to get started."
        },

        {
            id: 2,
            title: "Automate Analysis",
            desc: "SmartMLOps automatically identifies the target variable and selects the best model."
        },
        {
            id: 3,
            title: "Model Training and Tuning",
            desc: "The platform trains multiple models and fine-tunes them for optimal performance."
        },
        {
            id: 4,
            title: "Detailed Insights & Devlopment",
            desc: "Receive detailed performance metrices and deploy the best-performing model with ease."
        },

    ]
    return (
        <div className='text-white flex flex-col items-center mt-24'>
            <h1 className='text-4xl font-bold'>How SmartMLOps Works</h1>

            <ul className='w-[40%] flex flex-col translate-x-8 mt-5'>
                {workFlow.map((work, index) => (
                    <li className='flex gap-4 items-center mt-5' key={index}>
                        <div className='h-14 w-14 rounded-full bg-gray-800 flex items-center justify-center font-semibold text-xl'>{work.id}</div>
                        <div className='w-[80%]'>
                            <h2 className='font-semibold text-lg'>{work.title}</h2>
                            <p className='text-gray-500 font-semibold'>{work.desc}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    )
}
