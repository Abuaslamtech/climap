import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Footer = () => {
  return (
    <section className="bg-primary mt-12">
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Help Us Map Healthcare Facilities
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Know a healthcare facility that's not listed? Add it to our database
          and help improve healthcarec accessibility.
        </p>
        <Link
          to="/AddFacility"
          className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Submit a Facility
        </Link>
      </div>
    </section>
  );
};

export default Footer;
