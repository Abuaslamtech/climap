import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ShieldCheck, MailCheck } from "lucide-react";

const ResetSuccess = () => {
  const location = useLocation();
  const email = location.state?.email || "";

  const features = [
    "Check your email inbox",
    "Look for the Climap password reset link",
    "Click the link to create a new password",
    "Link expires in 1 hour",
  ];

  return (
    <div className="w-full bg-white flex flex-row justify-center items-center">
      {/* Left side - Features panel */}
      <div className="hidden lg:flex w-1/2 bg-primary/10 min-h-screen flex-col justify-center px-12 relative">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-primary mb-8">
            Check Your Email
          </h2>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <MailCheck className="text-primary" size={24} />
                <p className="text-gray-700 text-lg">{feature}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic">
                "Password reset is just a click away!"
              </p>
              <div className="mt-4">
                <p className="font-medium text-primary">Emily Rodriguez</p>
                <p className="text-sm text-gray-500">Cybersecurity Expert</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Success Message */}
      <div className="w-full lg:w-1/2 p-4 flex justify-center items-center">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-8">
            <MailCheck className="text-primary" size={80} />
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-primary mb-4">
            Email Sent Successfully
          </h1>

          <p className="text-gray-600 mb-6">
            We've sent a password reset link to
            <br />
            <span className="font-bold text-primary">{email}</span>
          </p>

          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="text-green-600" size={24} />
              <p>Check your email and follow the instructions</p>
            </div>
          </div>

          <div className="text-center text-gray-600 flex flex-row gap-2 justify-center">
            <p>Didn't receive the email?</p>
            <Link
              to="/resetPassword"
              className="text-primary hover:text-primaryDark"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
