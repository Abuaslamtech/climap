import { UserPlus, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const benefits = [
    "Access to exclusive content and resources",
    "Regular updates on new features",
    "Cross-Platform Healthcare Search",
    "Instant Access to Nearby Facilities",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-row justify-center items-center">
      {/* Left side - Benefits panel */}
      <div className="hidden lg:flex w-1/2 bg-primary/10 min-h-screen flex-col justify-center rounded-r-3xl px-12 relative">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-primary mb-8 flex flex-row gap-4 justify-center items-center">
            Join our growing community
          </h2>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={24} />
                <p className="text-gray-700 text-lg">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic">
                "I was impressed by the comprehensive list of pediatric
                hospitals in Kaduna State on this website. The filters and
                mapping features made it easy to locate the nearest facility!"
              </p>
              <div className="mt-4">
                <p className="font-medium text-primary">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Product Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-12 right-12 w-32 h-32 bg-primary/5 rounded-full" />
        <div className="absolute bottom-12 left-12 w-24 h-24 bg-primary/5 rounded-full" />
      </div>

      {/* Right side - Registration form */}
      <div className="w-full lg:w-1/2 p-4 flex justify-center items-center">
        <div className="w-full max-w-md ">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-black text-primary">
              Sign Up
            </h1>
            <p className="text-gray-600 mt-2">
              Fill the form to register an account with us
            </p>
          </div>

          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                focus:border-primary shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                focus:border-primary shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                focus:border-primary shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                focus:border-primary shadow-sm"
              />
            </div>

            <button
              className="flex flex-row justify-center items-center gap-2 mt-2 p-3 w-full rounded-lg bg-primary hover:bg-primaryDark text-white font-medium transition-colors"
              type="submit"
            >
              Create Account <UserPlus size={16} />
            </button>
          </form>

          <div className="text-center mt-6 text-gray-600 flex flex-row gap-2 justify-center">
            <p>Already have an account?</p>
            <Link to="/login" className="text-primary hover:text-primaryDark">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
