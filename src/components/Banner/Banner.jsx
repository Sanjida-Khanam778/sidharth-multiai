import React from "react";
import { Link } from "react-router-dom";
import bannerbg from "../../assets/images/bannerbg.png";

export default function Banner() {
  return (
    <div className="h-[80vh] w-full mx-auto flex bg-[#F9FAFB] ">
      <div
        className="w-full min-h-[70vh] flex items-center justify-center "
        style={{
          backgroundImage: `url(${bannerbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-10/12 mx-auto flex flex-col items-center gap-10 md:items-start justify-center md:px-4 py-12">
          <div className="w-3/4 ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left mb-10">
              Smarter Biomedical Research with AI
            </h1>
            <p className="text-base sm:text-lg md:text-2xl max-w-2xl mt-6 text-center md:text-left">
              Ask a research question and compare answers from ChatGPT, Copilot,
              and more - with sources.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full justify-center md:justify-start">
            <Link to="/dashboard">
              <button className="bg-primary hover:bg-primary text-white font-semibold text-lg sm:text-xl border-2 py-3 px-10 sm:px-16 rounded-lg w-full sm:w-auto">
                Get Started
              </button>
            </Link>
            <a href="#about">
              <button className="bg-transparent hover:bg-primary hover:text-white font-semibold text-lg sm:text-xl border-2 py-3 px-10 sm:px-16 rounded-lg w-full sm:w-auto">
                How it work
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
