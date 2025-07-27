import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  client?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  client = false,
}) => {
  if (totalPages <= 1) return null;

  const color = client ? "#FFCC00" : "#00ADB5";

  const handlePrevious = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onPageChange(currentPage + 1);
  };
  const handlePageClick = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    if (startPage > 0) {
      pages.push(0);
      if (startPage > 1) {
        pages.push(-1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push(-1);
      }
      pages.push(totalPages - 1);
    }

    return pages;
  };

  return (
    <nav
      className={`flex justify-center my-8 ${className}`}
      aria-label="Pagination"
    >
      <ul className="flex list-none p-0 gap-1">
        <li
          className={`flex items-center ${
            currentPage === 0 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <button
            className="flex items-center justify-center min-w-[2.5rem] h-10 px-2 border border-gray-300 bg-white text-gray-700 rounded-md transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            aria-label="Previous"
          >
            &laquo;
          </button>
        </li>

        {getPageNumbers().map((page, index) => (
          <li
            key={index}
            className={`flex items-center ${
              page === -1 ? "pointer-events-none" : ""
            }`}
          >
            {page === -1 ? (
              <span className="flex items-center justify-center min-w-[2.5rem] h-10 px-2 border border-transparent">
                ...
              </span>
            ) : (
              <button
                className={`flex items-center justify-center min-w-[2.5rem] h-10 px-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[${color}] focus:border-[${color}] cursor-pointer ${
                  page === currentPage
                    ? `bg-[${color}] border-[${color}] text-white`
                    : `border-gray-300 bg-white text-gray-700 hover:bg-gray-100`
                }`}
                onClick={() => handlePageClick(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page + 1}
              </button>
            )}
          </li>
        ))}

        <li
          className={`flex items-center ${
            currentPage === totalPages - 1
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
        >
          <button
            className="flex items-center justify-center min-w-[2.5rem] h-10 px-2 border border-gray-300 bg-white text-gray-700 rounded-md transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            aria-label="Next"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
