import React from "react";
import Logo from '../assets/Home/tablogo.png'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 flex justify-center py-8 w-full box-border">
      <div className="flex flex-row justify-between max-w-[1200px] w-full">
        <div className="flex flex-col gap-4 flex-1 relative left-[60px]">
          <img src={Logo} alt="logo" className="h-12 w-12 ml-[3.5rem] mt-8 mb-4"/>
          <h3 className="text-xl font-semibold mb-0 tracking-tight">© 2024 DarkFlow</h3>
          <p className="text-[#646464] text-base leading-6 m-0">All rights reserved.</p>
        </div>
        <div className="flex flex-col gap-4 flex-1 relative left-[60px]">
          <h3 className="text-xl font-semibold mb-0 tracking-tight">Quick Links</h3>
          <a href="#home" className="text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">Home</a>
          <a href="#about" className="text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">About</a>
          <a href="#product" className="text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">Product</a>
          <a href="#contact" className="text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">Contact</a>
        </div>
        <div className="flex flex-col gap-4 flex-1 relative left-[60px]">
          <h3 className="text-xl font-semibold mb-0 tracking-tight">Connect with Us</h3>
          <div className="flex flex-col gap-2">
            <a href="#twitter" className="flex items-center gap-2 text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="#linkedin" className="flex items-center gap-2 text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="#instagram" className="flex items-center gap-2 text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="#facebook" className="flex items-center gap-2 text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">
              <i className="fab fa-facebook"></i> Facebook
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1 relative left-[60px]">
          <h3 className="text-xl font-semibold mb-0 tracking-tight">Legal</h3>
          <a href="#terms" className="text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">Terms</a>
          <a href="#privacy" className="text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">Privacy</a>
          <a href="#cookie-policy" className="text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">Cookie Policy</a>
          <a href="#sitemap" className="text-gray-600 no-underline text-base leading-6 transition-colors duration-300 hover:text-[var(--color1)]">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
