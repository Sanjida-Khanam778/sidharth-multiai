import React from "react";
import { Link } from "react-router-dom";
 
export default function Banner() {
  return (
    <div className="h-screen w-full mx-auto grid grid-cols-12 bg-[#F9FAFB] relative">
      <div className="col-span-7"></div>
      <div className="relative col-span-5 overflow-hidden w-full">
        {/* <div className="bg-blue-500 h-96 w-[1000px] absolute top-[0%] rotate-45"></div> */}
        <div className="bg-blue-500 h-[1400px] w-[1400px] -right-[90%] absolute -top-[90%] rotate-[43deg]"></div>
        <div className="bg-[#E5E7EB] h-[1400px] w-[1400px] -right-[93%] absolute -top-[93%] rotate-[50deg] z-10"></div>
        <div className="bg-blue-500 h-[1400px] w-[1400px] -right-[90%] absolute -bottom-[90%] -rotate-[43deg]"></div>
        <div className="bg-[#E5E7EB] h-[1400px] w-[1400px] -right-[93%] absolute -bottom-[93%] -rotate-[50deg] z-10"></div>
      </div>
      <div className="absolute top-0 left-0 h-screen w-full z-30">
        <div className="relative max-w-7xl mx-auto flex flex-col justify-center h-screen">
          <h1 className="text-6xl font-bold">
            Smarter Biomedical Research with AI
          </h1>
          <p className="text-2xl max-w-3xl mt-10">
            Ask a research question and compare answers from ChatGPT, Copilot,
            and more- with sources.
          </p>
 
          <div className="flex gap-5 mt-10 justify-center items-center w-full absolute bottom-20">
            <Link to="/dashboard">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-xl border-2 py-3 px-16 rounded-lg">
              Get Started
            </button>
            </Link>
            <button className="bg-transparent hover:bg-blue-700 hover:text-white font-semibold text-xl border-2 py-3 px-16 rounded-lg">
              How it work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
