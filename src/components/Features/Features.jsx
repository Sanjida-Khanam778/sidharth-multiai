const Features = () => {
    const features = [
      {
        title: "Multi-Source AI Query Engine",
        subtitle: "Comprehensive, unbiased insights",
        tags: ["Data Aggregation", "AI Integration"],
        bgColor: "bg-gray-100"
      },
      {
        title: "Aggregated Response Viewer",
        subtitle: "Time-saving, holistic view",
        tags: ["Holistic Overview", "Response Viewer"],
        bgColor: "bg-gray-100"
      },
      {
        title: "Citation and Source Display",
        subtitle: "Credibility, verifiable results",
        tags: ["Source Verification", "Citation Display"],
        bgColor: "bg-gray-100"
      },
      {
        title: "Visual Output Support",
        subtitle: "Clear understanding of complex data",
        tags: ["Data Clarity", "Visual Support"],
        bgColor: "bg-gray-100"
      }
    ];
  
    return (
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.subtitle}
                  </p>
                </div>
                
                {/* Mock Interface */}
                <div className="bg-gray-800 rounded-lg p-4 mb-4 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-700 rounded-lg p-3 text-white text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">{feature.tags[0]}</span>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    {feature.tags[1] && (
                      <div className="bg-gray-700 rounded-lg p-3 text-white text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">{feature.tags[1]}</span>
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  export default Features;
  
