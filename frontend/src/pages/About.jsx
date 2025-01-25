import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Activity, MapPin, Plus, TrendingUp, Users } from "lucide-react";
import AboutHeader from "../components/AboutHeader";
import { Link } from "react-router-dom";

function About() {
  const aboutText = [
    {
      title: "Our Mission",
      message:
        "At Cli-map, we empower individuals to take control of their healthcare journey by providing instant access to verified information for over 40,000 Nigerian health facilities. Our platform eliminates the need to ask around for basic healthcare information, putting reliable data about clinics, hospitals, and medical centers directly in your hands through our intuitive map-based interface.",
    },
    {
      title: "Our Vision",
      message:
        "We envision a future where no one in Nigeria has to struggle to find critical health services. By combining comprehensive data from official sources like the Nigeria Health Facilities dataset with community contributions, we aim to become Africa's most trusted health resource platform. Our goal is to expand coverage to every healthcare provider while maintaining rigorous verification standards.",
    },
    {
      title: "Why We Exist",
      message:
        "In a country with diverse healthcare needs, we recognized the critical gap in accessible, organized health facility information. Traditional methods of finding medical centers often lead to frustration with outdated or unreliable data. Cli-map solves this by offering real-time access to verified locations, contact details, and services - helping users make informed healthcare decisions when it matters most.",
    },
    {
      title: "Our Community",
      message:
        "Cli-map thrives through collaboration. While our core database comes from verified sources like the Humanitarian Data Exchange, we empower registered users to add new facilities through our community upload feature. Every submission undergoes strict verification to ensure accuracy. Our diverse team of healthcare advocates, data specialists, and tech experts works tirelessly to maintain this vital public resource.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white">
      <NavBar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Mapping Nigeria's Healthcare Access
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting 40,000+ verified health facilities to those who need them
          most
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-4 pb-28">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Data Stats Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
            <h3 className="text-2xl font-semibold mb-6">
              Our Impact in Numbers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Verified Facilities */}
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="text-green-600" size={24} />{" "}
                  {/* Changed icon */}
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">40,000+</p>
                  <p className="text-gray-600">Verified Facilities</p>
                  <div className="mt-2 h-2 bg-green-100 rounded-full">
                    <div
                      className="w-4/5 h-full bg-green-600 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Covering 92% of Nigerian states
                  </p>
                </div>
              </div>

              {/* User Contributions */}
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="text-green-600" size={24} />{" "}
                  {/* Changed icon */}
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">100+</p>
                  <p className="text-gray-600">Daily Contributions</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="text-green-600 mr-2" size={18} />
                    <span className="text-sm text-green-600">
                      +15% this month
                    </span>
                  </div>
                </div>
              </div>

              {/* New Stat 1 - Coverage Map Preview */}
              <div className="col-span-full p-4 bg-gradient-to-br from-green-50 to-green-50 rounded-lg">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">
                      National Coverage
                    </h4>
                    <p className="text-gray-600">
                      Serving healthcare needs across all 36 states with
                      concentrated support in{""}
                      <span className="font-medium">
                        Lagos, Kano, and Abuja
                      </span>
                    </p>
                  </div>
                  <div className="relative w-full md:w-48 h-48 bg-green-100 rounded-lg overflow-hidden">
                    {/* Add a simple Nigeria map SVG or image here */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-green-600 font-bold">
                        36 States
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Stat 2 - Recent Activity */}
              <div className="col-span-full p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <Activity className="text-orange-600" size={28} />
                  <div>
                    <p className="text-xl font-bold text-orange-600">
                      328 New Facilities
                    </p>
                    <p className="text-gray-600">
                      Added this week by our community
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 text-center border-t pt-6">
              <p className="text-gray-600 mb-4">
                Help us expand our coverage further
              </p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto">
                <Plus size={18} />
                Submit a Facility
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {aboutText.map((about, index) => (
              <div
                key={index}
                className="group relative bg-white p-6 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="bg-green-100 p-2 rounded-lg self-start">
                    <Plus className="text-green-600 transform transition-transform duration-300 group-hover:rotate-90" />
                  </div>
                  <div>
                    <AboutHeader title={about.title} />
                    <p className="text-gray-700 leading-7 mt-2">
                      {about.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Replace the existing Data Source Footer with this */}
        <div className="mt-16 bg-green-50 rounded-2xl p-8 sm:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Contribution CTA */}
              <div className="space-y-4 border-r border-green-200 pr-8">
                <div className="bg-white p-4 rounded-xl shadow-inner inline-block">
                  <Plus
                    className="text-green-600"
                    size={32}
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Help Expand Our Map
                </h3>
                <p className="text-gray-600 mb-4">
                  Verified users can contribute new facilities to help improve
                  healthcare access
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Link to={"/add"}>Submit a Facility</Link>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Verified Data Sources
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  <img
                    src="https://data.humdata.org/images/homepage/logo-hdx-gray.svg"
                    alt="Humanitarian Data Exchange"
                    className="h-12 opacity-75 hover:opacity-100 transition-opacity"
                  />
                  <img
                    src="https://ibc-static.broad.msu.edu/sites/globaledge/flags/countries/NG.svg"
                    alt="Nigeria Government"
                    className="h-12 opacity-75 hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Data verified through our partnership with{" "}
                  <a
                    href="https://data.humdata.org/dataset/nigeria-health-facilities"
                    className="text-green-600 hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    HDX Nigeria
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
