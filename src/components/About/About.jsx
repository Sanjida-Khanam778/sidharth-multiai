const About = () => {
    return (
      <div className=" py-20">
        <div className="w-10/12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-between">
            {/* Left Column - Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                The World's Most Comprehensive AI insights for Research <br /> and Development
              </h1>
            </div>
  
            {/* Right Column - Description */}
            <div className="justify-items-end">
              <p className="text-lg text-gray-600 leading-relaxed ">
                Tired of sifting through fragmented AI tools? Struggling <br /> with inconsistent results across different AI models? Our <br /> platform aggregates multiple AI engines to provide <br /> comprehensive and reliable insights for biomedical <br /> researchers.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default About;