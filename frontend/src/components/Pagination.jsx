import { ChevronLeft, ChevronRight } from "lucide-react";

// Add Pagination UI at the bottom of facilities list:
export const Pagination = ({ currentPage, totalPages }) => (
  <div className="flex justify-center items-center gap-4 mt-8">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="p-2 rounded-lg border disabled:opacity-50"
    >
      <ChevronLeft size={20} />
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="p-2 rounded-lg border disabled:opacity-50"
    >
      <ChevronRight size={20} />
    </button>
  </div>
);
