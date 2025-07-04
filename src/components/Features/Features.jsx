import cell1 from "../../assets/images/cell1.jpeg";
import cell2 from "../../assets/images/cell2.png";
import cell3 from "../../assets/images/cell3.jpeg";
import cell4 from "../../assets/images/cell4.jpeg";

const Features = () => {
  const features = [
    {
      title: "Multi-Source AI Query Engine",
      subtitle: "Comprehensive, unbiased insights",
      image: cell1,
      bgColor: "bg-gray-100",
    },
    {
      title: "Aggregated Response Viewer",
      subtitle: "Time-saving, holistic view",
      image: cell2,
      bgColor: "bg-gray-100",
    },
    {
      title: "Citation and Source Display",
      subtitle: "Credibility, verifiable results",
      image: cell3,
      bgColor: "bg-gray-100",
    },
    {
      title: "Visual Output Support",
      subtitle: "Clear understanding of complex data",
      image: cell4,
      bgColor: "bg-gray-100",
    },
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
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.subtitle}</p>
              </div>

              {/* Mock Interface */}
              <div className=" p-4 relative overflow-hidden w-full h-80">
                <img
                  src={feature.image}
                  className="w-full h-full object-cover rounded-xl"
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Features;
