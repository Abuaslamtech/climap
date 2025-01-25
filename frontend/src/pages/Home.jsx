import React from "react";
import {
  Search,
  Shield,
  MapPin,
  Hospital,
  Users,
  Award,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const HomePage = () => {
  // Sample data - these would typically come from your backend
  const featuredFacilities = [
    {
      name: "Lagos University Teaching Hospital",
      location: "Lagos",
      type: "Teaching Hospital",
      rating: 4.5,
    },
    {
      name: "Abuja National Hospital",
      location: "Abuja",
      type: "Referral Hospital",
      rating: 4.7,
    },
    {
      name: "Port Harcourt General Hospital",
      location: "Rivers State",
      type: "General Hospital",
      rating: 4.3,
    },
  ];

  const features = [
    {
      icon: <Search color="#28A745" size={40} />,
      title: "Comprehensive Search",
      description:
        "Easily find healthcare facilities across Nigeria with advanced filtering options.",
    },
    {
      icon: <Shield color="#FFC107" size={40} />,
      title: "Verified Facilities",
      description:
        "All listed facilities are verified and meet basic healthcare standards.",
    },
    {
      icon: <MapPin color="#1C7430" size={40} />,
      title: "Location-Based Discovery",
      description:
        "Discover healthcare centers nearest to your current location.",
    },
  ];

  return (
    <div className="bg-white">
      <NavBar />
      {/* Hero Section - Improved Responsiveness */}
      <div className="bg-neutralGray min-h-[500px] flex items-center py-12 px-8 mt-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-primaryDark leading-tight">
              Find Healthcare Facilities Across Nigeria
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              Discover, locate, and access healthcare centers near you with
              ease. Whether you need a clinic, hospital, or specialized medical
              facility, we've got you covered.
            </p>

            {/* Call to Action Buttons - Responsive Alignment */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to={"/browse"}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primaryDark text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Search size={20} />
                Browse Facilities
              </Link>
              <Link
                to={"addfacility"}
                className="flex items-center justify-center gap-2 bg-accentGold hover:bg-yellow-600 text-black px-6 py-3 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Submit a Clinic
              </Link>
            </div>
          </div>

          {/* Illustration/Graphic Section - Mobile Hidden */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="bg-primaryLight/20 w-[350px] h-[350px] rounded-full absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="space-y-4">
                <div className="flex items-center bg-white shadow-md rounded-lg p-4 transform -rotate-6">
                  <MapPin color="#28A745" className="mr-3" />
                  <span className="text-gray-700">Nearest Clinic Finder</span>
                </div>
                <div className="flex items-center bg-white shadow-md rounded-lg p-4 translate-x-10">
                  <ShieldCheck color="#FFC107" className="mr-3" />
                  <span className="text-gray-700">Verified Facilities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Improved Responsiveness */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primaryDark mb-4">
            Why Use Our Platform?
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            We aim to make healthcare accessibility easier and more transparent
            for Nigerians across all states.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-neutralGray p-4 md:p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {React.cloneElement(feature.icon, {
                  size: 32, // Slightly smaller on mobile
                  color: feature.icon.props.color,
                })}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-primaryDark mb-3">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Facilities Section - Improved Responsiveness */}
      <section className="bg-neutralGray py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primaryDark mb-4">
              Featured Healthcare Facilities
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Explore some of the top-rated healthcare centers across Nigeria.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {featuredFacilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Hospital color="#28A745" size={32} md:size={40} />
                    <span className="text-yellow-500 font-bold text-sm md:text-base">
                      ★ {facility.rating}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-primaryDark mb-2">
                    {facility.name}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm md:text-base">
                    <MapPin size={16} className="mr-2" />
                    <span>{facility.location}</span>
                  </div>
                  <div className="mt-4">
                    <span className="bg-primaryLight/20 text-primaryDark px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                      {facility.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
