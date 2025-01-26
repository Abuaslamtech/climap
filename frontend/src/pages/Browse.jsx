import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Hospital,
  Plus,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  User,
  Map,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { states } from "../utils/states";
import { lga } from "../utils/lga";
import Footer from "../components/Footer";
import { MapModal } from "../components/MapModal";
import { Pagination } from "../components/Pagination";

const Browse = () => {
  // State variables
  const [facilities, setFacilities] = useState([]);
  const [filters, setFilters] = useState({
    state_name: "",
    lga_name: "",
    category: "",
    searchQuery: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalFacilities, setTotalFacilities] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.state_name,
    filters.lga_name,
    filters.category,
    filters.searchQuery,
  ]);

  // Fetch facilities data when component mounts or filters change
  useEffect(() => {
    if (
      filters.searchQuery ||
      filters.state_name ||
      filters.lga_name ||
      filters.category
    ) {
      searchAndFilterFacilities();
    } else {
      fetchFacilities();
    }
  }, [currentPage, filters]);

  // Fetch facilities (general retrieval)
  const fetchFacilities = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://climap.onrender.com/api/facilities/retrieve?page=${currentPage}`
      );
      if (!response.ok) throw new Error("Failed to fetch facilities");
      const data = await response.json();

      setFacilities(data.facilities);
      setTotalPages(data.totalPages);
      setTotalFacilities(data.totalFacilities);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Search and filter facilities
  const searchAndFilterFacilities = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        query: filters.searchQuery,
        state: filters.state_name,
        lga: filters.lga_name,
        category: filters.category,
        page: currentPage,
      });

      const response = await fetch(
        `https://climap.onrender.com/api/facilities/search?${queryParams}`
      );
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();

      setFacilities(data.facilities);
      setTotalPages(data.totalPages);
      setTotalFacilities(data.totalFacilities);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state_name" && { lga_name: "" }),
    }));
  };

  // Debounced search input handler
  const handleSearch = (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        handleFilterChange("searchQuery", value);
      }, 300) // 300ms debounce
    );
  };

  // Format date to a readable format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render error message if there's an error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error loading facilities
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="relative bg-primary pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Find Healthcare Facilities
              <span className="block text-white/90">In Your Area</span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Access detailed information about healthcare facilities across
              Nigeria
            </p>
            {/* filter */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Facility..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-lg"
                  value={filters.searchQuery}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }));
                    handleSearch(e.target.value);
                  }}
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={24}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                  aria-expanded={showFilters}
                >
                  <Filter size={20} className="text-gray-400" />
                </button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <select
                    className="w-full p-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    value={filters.state_name}
                    onChange={(e) =>
                      handleFilterChange("state_name", e.target.value)
                    }
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  <select
                    className="w-full p-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    value={filters.lga_name}
                    onChange={(e) =>
                      handleFilterChange("lga_name", e.target.value)
                    }
                    disabled={!filters.state_name}
                  >
                    <option value="">Select LGA</option>
                    {filters.state_name &&
                      lga[filters.state_name].map((localGovt) => (
                        <option key={localGovt} value={localGovt}>
                          {localGovt}
                        </option>
                      ))}
                  </select>

                  <select
                    className="w-full p-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                  >
                    <option value="">Facility Type</option>
                    <option value="primary health center">Primary</option>
                    <option value="hospital">Secondary</option>
                    <option value="teaching hospital">Tertiary</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 container mx-auto px-4 py-12 bg-gradient-to-b from-[#F8F9FA] to-white">
        <div className="flex justify-between items-center mb-8 border-b border-primary pb-4">
          <div className="w-2/5 bg-gradient-to-r from-[#28A745] to-[#1C7430] text-transparent bg-clip-text">
            <h2 className="border-l-8 border-primary pl-2 text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accentGold bg-clip-text text-transparent">
              {isLoading ? "Loading..." : `${totalFacilities} Facilities Found`}
            </h2>
          </div>
          <Link
            to="/AddFacility"
            className="flex items-center gap-2 bg-gradient-to-r from-[#28A745] to-[#1C7430] hover:from-[#1C7430] hover:to-[#28A745] text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Plus size={20} className="animate-pulse" />
            Add Facility
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : facilities.length > 0 ? (
          <div className="flex gap-8">
            <div className="w-full grid md:grid-cols-2 gap-12 justify-between items-center">
              {facilities.map((facility) => (
                <div
                  key={facility._id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer p-6 border border-gray-100 hover:border-[#8BD39E] transform hover:-translate-y-1"
                  onClick={() => setSelectedFacility(facility)}
                >
                  {/* Facility card content */}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No facilities found for the selected criteria
            </p>
            <button
              onClick={() =>
                setFilters({
                  state_name: "",
                  lga_name: "",
                  category: "",
                  searchQuery: "",
                })
              }
              className="mt-4 text-primary hover:text-primarydark underline"
            >
              Clear filters
            </button>
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) =>
            setCurrentPage(Math.max(1, Math.min(newPage, totalPages)))
          }
        />
      </div>
      {isModalOpen && (
        <MapModal
          facility={selectedFacility}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFacility(null);
          }}
        />
      )}
      <Footer />
    </div>
  );
};

export default Browse;
