import React, { useState } from 'react';
import Logo from "../assets/Home/logo.png";
import SmallLogo from "../assets/Home/tablogo.png";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='flex items-center justify-between mt-2'>
            <ul className='text-white flex items-center gap-12'>
                <li>
                    <img src={SmallLogo} className="h-8 md:hidden" alt="small logo" />
                    <img src={Logo} className="h-8 hidden md:block" alt="logo" />
                </li>
            </ul>

            {/* Hamburger/Cross Button */}
            <button 
                className='block md:hidden text-white focus:outline-none'
                onClick={toggleMenu}
            >
                {isMenuOpen ? (
                    // Cross Icon (shown when menu is open)
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                ) : (
                    // Hamburger Icon (shown when menu is closed)
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                )}
            </button>

            {/* Menu Links (toggle visibility based on state) */}
            <ul className={`text-white flex-col gap-4 items-center absolute top-16 right-36 bg-gray-800 p-4 rounded-lg md:flex md:flex-row md:static md:top-auto md:right-auto md:bg-transparent md:p-0 md:rounded-none md:gap-12 ${isMenuOpen ? 'flex' : 'hidden'}`}>
                <li>Features</li>
                <li>Pricing</li>
                <li>FAQ</li>
                <li>
                    <button className='bg-white text-black p-2 rounded-md mt-2 md:mt-0'>Get Started</button>
                </li>
            </ul>
        </div>
    );
}
