import React, { useState } from "react";
import {
  MapPin,
  Building,
  ChevronRight,
  Save,
  AlertCircle,
} from "lucide-react";
import NavBar from "../components/NavBar";

const AddFacility = () => {
  const [formData, setFormData] = useState({
    name: "",
    state_name: "",
    lga_name: "",
    category: "",
    type: "",
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const facilityTypes = ["Primary", "Secondary", "Tertiary"];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (formData.name.length > 50) {
      newErrors.name = "Name must not exceed 50 characters";
    }
    if (!formData.state_name) {
      newErrors.state_name = "State is required";
    }
    if (!formData.lga_name) {
      newErrors.lga_name = "LGA is required";
    }
    if (!formData.type) {
      newErrors.type = "Facility type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // API call implementation here
      console.log("Form data:", formData);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" bg-gradient-to-b from-primaryLight/10 to-white">
      <NavBar />
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primaryDark py-12">
        <div className="container mx-auto px-4 mt-24">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Submit a Healthcare Facility
            </h1>
            <p className="text-primaryLight text-lg">
              Help improve healthcare access by adding a facility to our
              database
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6"
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primaryDark flex items-center gap-2">
                <Building size={24} />
                Basic Information
              </h2>

              <div className="space-y-4">
                {/* Facility Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Facility Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none`}
                    placeholder="Enter facility name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Facility Type */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Facility Type*
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {facilityTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, type }))
                        }
                        className={`px-4 py-3 rounded-lg border transition-colors ${
                          formData.type === type
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {errors.type && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.type}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="Enter facility category"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primaryDark flex items-center gap-2 pt-4 border-t">
                <MapPin size={24} />
                Location Details
              </h2>

              <div className="space-y-4">
                {/* State Selection */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    State*
                  </label>
                  <div className="relative">
                    <select
                      name="state_name"
                      value={formData.state_name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.state_name ? "border-red-500" : "border-gray-300"
                      } focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none`}
                    >
                      <option value="">Select a state</option>
                      {/* Add state options here */}
                    </select>
                    <ChevronRight
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-500"
                      size={20}
                    />
                  </div>
                  {errors.state_name && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.state_name}
                    </p>
                  )}
                </div>

                {/* LGA Selection */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Local Government Area*
                  </label>
                  <div className="relative">
                    <select
                      name="lga_name"
                      value={formData.lga_name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.lga_name ? "border-red-500" : "border-gray-300"
                      } focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none`}
                    >
                      <option value="">Select an LGA</option>
                      {/* Add LGA options based on selected state */}
                    </select>
                    <ChevronRight
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-500"
                      size={20}
                    />
                  </div>
                  {errors.lga_name && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.lga_name}
                    </p>
                  )}
                </div>

                {/* Map Location Picker */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Pin Location on Map*
                  </label>
                  <div className="h-[300px] bg-neutralGray rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      Map Component Integration Here
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primaryDark text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Save size={20} />
                {isSubmitting ? "Submitting..." : "Submit Facility"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFacility;
