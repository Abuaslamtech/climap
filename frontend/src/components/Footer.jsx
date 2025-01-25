import React from "react";
import { Link } from "react-router-dom";
import { Award, Plus, Users } from "lucide-react";

const Footer = () => {
  return (
    <section className="bg-primary text-white py-12 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          Help Us Improve Healthcare Access
        </h2>
        <p className="text-sm md:text-lg max-w-2xl mx-auto mb-6 md:mb-8">
          Know a healthcare facility not on our list? Help the community by
          submitting verified information about medical centers across Nigeria.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to={"/AddFacility"}
            className="bg-white text-primary hover:bg-gray-100 px-6 md:px-8 py-2 md:py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Users size={20} />
            Submit a Facility
          </Link>
          <Link
            to={"/about"}
            className="border-2 border-white hover:bg-white hover:text-primary px-6 md:px-8 py-2 md:py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Award size={20} />
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
