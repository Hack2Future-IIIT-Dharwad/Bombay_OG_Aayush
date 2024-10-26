import React, { useState } from "react";

function Pricing_FAQ() {

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
  return (
    <div className="bg-black text-white p-8">
      {/* Pricing Plans Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-lg mb-8 text-gray-400">
          Find the perfect plan to streamline your machine learning projects
        </p>
        <div className="flex justify-center space-x-8">
          {/* Basic Plan */}
          <div className="bg-gray-900 p-8 rounded-lg w-64 text-left">
            <h3 className="text-xl font-bold mb-4">Basic</h3>
            <p className="text-2xl font-bold mb-4">
              $9<span className="text-lg">/month</span>
            </p>
            <ul className="space-y-2">
              <li>✔️ Automated Model Selection</li>
              <li>✔️ Basic Data Visualizations</li>
            </ul>
            <button className="mt-8 bg-white text-black py-2 px-4 rounded-md">
              Get Started
            </button>
          </div>
          {/* Pro Plan */}
          <div className="bg-orange-500 p-8 rounded-lg w-64 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Pro</h3>
              <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-full">
                Popular
              </span>
            </div>
            <p className="text-2xl font-bold mb-4">
              $29<span className="text-lg">/month</span>
            </p>
            <ul className="space-y-2">
              <li>✔️ All Basic Features</li>
              <li>✔️ Advanced Data Visualizations</li>
              <li>✔️ Priority Support</li>
            </ul>
            <button className="mt-8 bg-white text-black py-2 px-4 rounded-md">
              Let's Go
            </button>
          </div>
          {/* Enterprise Plan */}
          <div className="bg-gray-900 p-8 rounded-lg w-64 text-left">
            <h3 className="text-xl font-bold mb-4">Enterprise</h3>
            <p className="text-2xl font-bold mb-4">
              $99<span className="text-lg">/month</span>
            </p>
            <ul className="space-y-2">
              <li>✔️ All Pro Features</li>
              <li>✔️ Custom Integrations</li>
              <li>✔️ Dedicated Support</li>
            </ul>
            <button className="mt-8 bg-white text-black py-2 px-4 rounded-md">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="text-left mb-16 flex items-center justify-evenly mt-36">
        <div>
          <h3 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h3>
          <p className="text-lg mb-8 text-gray-400">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {/* Question 1 */}
          <div>
            <div
              className="flex justify-between items-center border-b border-gray-700 py-4 cursor-pointer"
              onClick={() => toggleAnswer(0)}
            >
              <p>What file formats are supported?</p>
              <span>{openIndex === 0 ? "➖" : "➜"}</span>
            </div>
            {openIndex === 0 && (
              <p className="text-gray-400 mt-2">
                Supported formats include CSV, JSON, and Excel files.
              </p>
            )}
          </div>

          {/* Question 2 */}
          <div>
            <div
              className="flex justify-between items-center border-b border-gray-700 py-4 cursor-pointer"
              onClick={() => toggleAnswer(1)}
            >
              <p>Can I download the analysis reports?</p>
              <span>{openIndex === 1 ? "➖" : "➜"}</span>
            </div>
            {openIndex === 1 && (
              <p className="text-gray-400 mt-2">
                Yes, you can download the analysis reports in PDF format.
              </p>
            )}
          </div>

          {/* Question 3 */}
          <div>
            <div
              className="flex justify-between items-center border-b border-gray-700 py-4 cursor-pointer"
              onClick={() => toggleAnswer(2)}
            >
              <p>Is there a free trial available?</p>
              <span>{openIndex === 2 ? "➖" : "➜"}</span>
            </div>
            {openIndex === 2 && (
              <p className="text-gray-400 mt-2">
                Yes, we offer a 14-day free trial with all features included.
              </p>
            )}
          </div>

          {/* Question 4 */}
          <div>
            <div
              className="flex justify-between items-center border-b border-gray-700 py-4 cursor-pointer"
              onClick={() => toggleAnswer(3)}
            >
              <p>What kind of support is available?</p>
              <span>{openIndex === 3 ? "➖" : "➜"}</span>
            </div>
            {openIndex === 3 && (
              <p className="text-gray-400 mt-2">
                We offer 24/7 email support and live chat during business hours.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center mt-36">
        <h3 className="text-2xl font-bold mb-4">
          Ready to Transform Your Machine Learning Workflow?
        </h3>
        <p className="mb-8">
          Join thousands of satisfied users and get started with SmartMLOps
          today.
        </p>
        <button className="bg-white text-black py-2 px-4 rounded-md">
          Get Started
        </button>
      </section>
    </div>
  );
}


export default Pricing_FAQ;
