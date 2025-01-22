import React, { useEffect, useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Hospital,
  Plus,
  Filter,
  Calendar,
  ChevronRight,
  User,
  Map,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { states } from "../utils/states";
import Footer from "../components/Footer";

const Browse = () => {
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

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://climap.onrender.com/api/facilities/retrieve"
        );
        if (!response.ok) throw new Error("Failed to fetch facilities");
        const data = await response.json();
        console.log(data);
        setFacilities(data.facilities);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const filteredFacilities = useMemo(() => {
    if (!facilities.length) return [];

    return facilities.filter((facility) => {
      const searchLower = filters.searchQuery.toLowerCase();
      const stateName = facility.state_name?.toLowerCase() || "";
      const lgaName = facility.lga_name?.toLowerCase() || "";
      const category = facility.category?.toLowerCase() || "";

      const matchesSearch =
        !filters.searchQuery ||
        facility.name.toLowerCase().includes(searchLower) ||
        stateName.includes(searchLower);

      const matchesState =
        !filters.state_name || stateName === filters.state_name.toLowerCase();

      const matchesLGA =
        !filters.lga_name || lgaName === filters.lga_name.toLowerCase();

      const matchesCategory =
        !filters.category || category === filters.category.toLowerCase();

      return matchesSearch && matchesState && matchesLGA && matchesCategory;
    });
  }, [facilities, filters]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => {
      if (name === "state_name") {
        return { ...prev, [name]: value, lga_name: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by facility name or location..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-lg"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    handleFilterChange("searchQuery", e.target.value)
                  }
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
                    {filters.state_name.toLowerCase() === "borno" && (
                      <>
                        <option value="askira uba">Askira Uba</option>
                        <option value="bayo">Bayo</option>
                        <option value="biu">Biu</option>
                        <option value="chibok">Chibok</option>
                        <option value="damboa">Damboa</option>
                        <option value="gwoza">Gwoza</option>
                        <option value="hawul">Hawul</option>
                        <option value="kwaya kusar">Kwaya Kusar</option>
                        <option value="shani">Shani</option>
                      </>
                    )}
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

      <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-[#F8F9FA] to-white">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-gradient-to-r from-[#28A745] to-[#1C7430] text-transparent bg-clip-text">
            <h2 className="text-3xl font-bold">
              {isLoading
                ? "Loading..."
                : `${filteredFacilities.length} Facilities Found`}
            </h2>
          </div>
          <Link
            to="/AddFacility"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#28A745] to-[#1C7430] hover:from-[#1C7430] hover:to-[#28A745] text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Plus size={20} className="animate-pulse" />
            Add Facility
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : filteredFacilities.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {filteredFacilities.map((facility) => (
                <div
                  key={facility._id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer p-6 border border-gray-100 hover:border-[#8BD39E] transform hover:-translate-y-1"
                  onClick={() => setSelectedFacility(facility)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#28A745] transition-colors">
                        {facility.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} className="text-[#28A745]" />
                        <span className="group-hover:text-[#28A745] transition-colors">
                          {facility.lga_name}, {facility.state_name}
                        </span>
                      </div>
                    </div>
                    <span className="bg-gradient-to-r from-accentGold to-[#1C7430] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                      {facility.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-6">
                    {[
                      {
                        icon: Hospital,
                        label: "Facility Type",
                        value: facility.type,
                      },
                      {
                        icon: User,
                        label: "Registered By",
                        value: facility.registeredBy,
                      },
                      {
                        icon: Calendar,
                        label: "Added On",
                        value: formatDate(facility.createdAt),
                      },
                      {
                        icon: MapPin,
                        label: "LGA Code",
                        value: facility.lga_code,
                      },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="bg-[#F8F9FA] rounded-lg p-4 group-hover:bg-[#8BD39E]/20 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={20} className="text-[#28A745]" />
                          <div>
                            <p className="text-sm text-gray-500">{label}</p>
                            <p className="font-semibold text-gray-900">
                              {value}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button className="w-full bg-primary hover:bg-primarydark text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <span>View Details</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-4 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-[#28A745] to-[#1C7430] p-4">
                  <h3 className="font-medium text-white text-lg">
                    {selectedFacility
                      ? selectedFacility.name
                      : "Select a facility"}
                  </h3>
                </div>
                <div className="h-[70vh] bg-gradient-to-b from-[#F8F9FA] to-white flex items-center justify-center p-8">
                  {selectedFacility ? (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-[#8BD39E]/20 rounded-full flex items-center justify-center">
                        <Map size={32} className="text-[#28A745]" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-gray-900">
                          Map coordinates
                        </p>
                        <p className="text-[#28A745] font-medium">
                          Latitude: {selectedFacility.geometry?.coordinates[1]}
                        </p>
                        <p className="text-[#1C7430] font-medium">
                          Longitude: {selectedFacility.geometry?.coordinates[0]}
                        </p>
                      </div>
                      <button className="mt-4 bg-[#FFC107] hover:bg-[#FFC107]/90 text-gray-900 px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto">
                        <Map size={16} />
                        <span>Open in Maps</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-[#F8F9FA] rounded-full flex items-center justify-center animate-pulse">
                        <Map size={32} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-lg">
                        Select a facility to view on map
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
