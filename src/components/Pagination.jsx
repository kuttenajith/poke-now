import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1 ? "opacity-50" : "hover:bg-gray-200"}`}
            >
                &laquo;
            </button>
            {currentPage > 3 && (
                <>
                    <button onClick={() => onPageChange(1)} className="px-3 py-1 mx-1 hover:bg-gray-200 rounded">
                        1
                    </button>
                    <span className="mx-1">...</span>
                </>
            )}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-3 py-1 mx-1 rounded ${number === currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                        }`}
                >
                    {number}
                </button>
            ))}
            {currentPage < totalPages - 2 && (
                <>
                    <span className="mx-1">...</span>
                    <button onClick={() => onPageChange(totalPages)} className="px-3 py-1 mx-1 hover:bg-gray-200 rounded">
                        {totalPages}
                    </button>
                </>
            )}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? "opacity-50" : "hover:bg-gray-200"}`}
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;
