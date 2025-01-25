import { UserPlus, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { states } from "../utils/states";
import { lga } from "../utils/lga";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    lga: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear any existing errors for this field
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.lga) newErrors.lga = "Local Govt is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length == 0;
  };

  const benefits = [
    "Access to exclusive content and resources",
    "Regular updates on new features",
    "Cross-Platform Healthcare Search",
    "Instant Access to Nearby Facilities",
  ];
  // registration logic
  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) return;
    console.log(formData);
    try {
      const data = await axios.post(
        "https://climap.onrender.com/api/users/register",
        formData
      );
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      setErrors({
        submit: err.response?.data?.error || "Registration failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          {errors.submit && (
            <div className="flex flex-col border border-red-600 bg-red-100 p-2 text-sm justify-center items-center my-4">
              {errors.submit}
            </div>
          )}
          <form className="flex flex-col gap-6" onSubmit={registerUser}>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                focus:border-primary shadow-sm"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                focus:border-primary shadow-sm"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="w-full flex flex-col gap-1">
                <label className="text-sm text-gray-700 font-medium">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter your state"
                  className="p-3 w-full border rounded-lg bg-white transition-all outline-none
    focus:border-primary shadow-sm"
                >
                  <option
                    name="default"
                    value="Select state"
                    onChange={handleInputChange}
                  >
                    Select State
                  </option>
                  {states.map((state) => (
                    <option key={state} name={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500">{errors.state}</p>}
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="text-sm text-gray-700 font-medium">
                  Local Govt
                </label>
                <select
                  name="lga"
                  value={formData.lga}
                  onChange={handleInputChange}
                  className="p-3 w-full border rounded-lg bg-white transition-all outline-none
    focus:border-primary shadow-sm"
                >
                  <option name="default" value="Select state">
                    Select LGA
                  </option>
                  {formData.state &&
                    lga[formData.state].map((localGovt) => (
                      <option
                        key={localGovt}
                        name={localGovt}
                        value={localGovt}
                      >
                        {localGovt}
                      </option>
                    ))}
                </select>
                {errors.lga && <p className="text-red-500">{errors.lga}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                focus:border-primary shadow-sm"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                name="confirmPassword"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                focus:border-primary shadow-sm"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              className="flex flex-row justify-center items-center gap-2 mt-2 p-3 w-full rounded-lg bg-primary hover:bg-primaryDark text-white font-medium transition-colors"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create Account"}
              {!isLoading && <UserPlus size={16} />}
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
