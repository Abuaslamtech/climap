import { Map, X } from "lucide-react";
import MapGraph from "./MapGraph";
import { useState } from "react";

export const MapModal = ({ facility, onClose }) => {
  const [mapVisibility, setmapVisibility] = useState(false);
  if (!facility) return null;

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
        <div className="bg-gradient-to-r from-[#28A745] to-[#1C7430] p-4 flex justify-between items-center rounded-t-xl">
          <h3 className="font-medium text-white text-lg">{facility.name}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {mapVisibility ? (
          <MapGraph facilities={facility} />
        ) : (
          <div className="p-8 bg-gradient-to-b from-[#F8F9FA] to-white">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#8BD39E]/20 rounded-full flex items-center justify-center">
                <Map size={32} className="text-[#28A745]" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900">
                  Map coordinates
                </p>
                <p className="text-[#28A745] font-medium">
                  Latitude: {facility.geometry?.coordinates[1]}
                </p>
                <p className="text-[#1C7430] font-medium">
                  Longitude: {facility.geometry?.coordinates[0]}
                </p>
              </div>
              <button
                className="mt-4 bg-[#FFC107] hover:bg-[#FFC107]/90 text-gray-900 px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
                onClick={() => {
                  setmapVisibility(!mapVisibility);
                }}
              >
                <Map size={16} />
                <span>Open in Maps</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
