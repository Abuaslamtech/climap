import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center my-40 p-10 text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            Coming Soon ...
          </h1>
          <p>
            You will be able to update information regarding a facility once
            this feature is implememnted, stay tune.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ComingSoonPage;
