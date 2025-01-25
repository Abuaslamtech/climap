import { Plus } from "lucide-react";
import React from "react";

function AboutHeader({ title }) {
  return (
    <div className=" m-auto  flex justify-between items-center mb-8 border-b border-primary pb-4">
      <div className="w-2/5 bg-gradient-to-r from-[#28A745] to-[#1C7430] text-transparent bg-clip-text">
        <h2 className="border-l-8 border-primary pl-2 text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accentGold bg-clip-text text-transparent">
          About Us
        </h2>
      </div>
      <buttton
        to="/AddFacility"
        className="flex items-center gap-2 bg-gradient-to-r from-[#28A745] to-[#1C7430] hover:from-[#1C7430] hover:to-[#28A745] text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <Plus size={20} className="animate-pulse" />
        {title}
      </buttton>
    </div>
  );
}

export default AboutHeader;
