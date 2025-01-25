import { SquareArrowRight, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);

  const features = [
    "Secure password reset mechanism",
    "Protecting your account access",
    "Quick and easy recovery process",
    "Instant notification of password changes",
  ];

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendPasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords d not match");
      setIsLoading(false);
      return;
    }
    try {
      console.log("Sending request with token:", token); // Verify token being sent
      const response = await axios.post(
        "https://climap.onrender.com/api/users/resetPassword",
        {
          token,
          newPassword: password,
        }
      );
      console.log("Response from server:", response.data); // Verify server response
      navigate("/login");
    } catch (err) {
      console.error("Error during password reset:", err); // Log any errors
      const errorMessage =
        err.response?.data?.error || err.message || "Password reset failed";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white flex flex-row justify-center items-center ">
      {/* Left side - Features panel */}
      <div className="hidden lg:flex w-1/2 bg-primary/10 min-h-screen flex-col justify-center px-12 relative">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-primary mb-8">
            Create New Password
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
                "Protecting my account has never been easier!"
              </p>
              <div className="mt-4">
                <p className="font-medium text-primary">Sarah Thompson</p>
                <p className="text-sm text-gray-500">IT Security Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Reset Password form */}
      <div className="w-full lg:w-1/2 p-4 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-black text-primary">
              Reset Password
            </h1>
            <p className="text-gray-600 mt-2">
              Enter your email to reset your password
            </p>
          </div>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={sendPasswordReset} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm text-gray-700 font-medium"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your new password"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                  focus:border-primary focus:ring-2 focus:ring-primary/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-gray-700 font-medium"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Enter your new password again"
                className="p-3 w-full border rounded-lg bg-white transition-all outline-none
                  focus:border-primary focus:ring-2 focus:ring-primary/30"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="flex flex-row justify-center items-center gap-2 mt-2 p-3 w-full rounded-lg
                bg-primary hover:bg-primaryDark text-white font-medium transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Reset Password"}
              {!isLoading && <SquareArrowRight size={16} />}
            </button>
          </form>

          <div className="text-center mt-6 text-gray-600 flex flex-row gap-2 justify-center">
            <p>Remember your password?</p>
            <Link to="/login" className="text-primary hover:text-primaryDark">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
