import { SquareArrowRight, ShieldCheck } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

// Constant Promotional texts
const LogIn = () => {
  const features = [
    "Access to exclusive content and resources",
    "Regular updates on new features",
    "Cross-Platform Healthcare Search",
    "Instant Access to Nearby Facilities",
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("");

  // handle inputs
  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  // Authenticating user login

  const authenticateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Input validation
    if (!email || !password) {
      setError("Email or password can't be empty");
      setIsLoading(false);
      return;
    }
    try {
      const user = await axios.post(
        " https://climap.onrender.com/api/users/login",
        { email, password }
      );

      // handle successful login
      const token = user.data.token;
      setToken(token);

      // store in local storage
      localStorage.setItem("token", token);

      // redirect to addFaciliy page
      return <Navigate to="/add" />;
    } catch (err) {
      if (err.response) {
        // server error
        setError(err.response.data.error || "Login failed");
      } else if (err.request) {
        // network error
        setError("Network error. Please try again");
      } else {
        setError("AN error occured. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-row justify-center items-center">
      {/* Left side - Features panel */}
      <div className="hidden lg:flex w-1/2 bg-primary/10 min-h-screen flex-col justify-center px-12 relative">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-primary mb-8">
            Welcome back!
          </h2>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <ShieldCheck className="text-primary" size={24} />
                <p className="text-gray-700 text-lg">{feature}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic">
                "The login process is seamless, and the dashboard provides
                everything I need at a glance!"
              </p>
              <div className="mt-4">
                <p className="font-medium text-primary">Michael Chen</p>
                <p className="text-sm text-gray-500">Senior Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-12 right-12 w-32 h-32 bg-primary/5 rounded-full" />
        <div className="absolute bottom-12 left-12 w-24 h-24 bg-primary/5 rounded-full" />
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 p-4 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-black text-primary">
              Sign In
            </h1>
            <p className="text-gray-600 mt-2">
              Fill the form to sign into your account
            </p>
          </div>
          {error && (
            <div className="flex flex-col border border-red-600 bg-red-100 p-2 text-sm justify-center items-center my-4">
              {error}
            </div>
          )}

          <form onSubmit={authenticateUser} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                focus:border-primary"
                onChange={handleInput}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                focus:border-primary"
                onChange={handleInput}
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primaryDark"
              >
                Forgot password?
              </Link>
            </div>

            <button
              className="flex flex-row justify-center items-center gap-2 mt-2 p-3 w-full rounded-lg bg-primary hover:bg-primaryDark text-white font-medium transition-colors"
              type="submit"
            >
              {isLoading ? "Signin In..." : "Sign In"}{" "}
              {!isLoading && <SquareArrowRight size={16} />}
            </button>
          </form>

          <div className="text-center mt-6 text-gray-600 flex flex-row gap-2 justify-center">
            <p>Don't have an account?</p>
            <Link
              to="/register"
              className="text-primary hover:text-primaryDark"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
