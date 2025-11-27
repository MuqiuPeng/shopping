"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useMemo, useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination = memo(
  function Pagination({
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    onPageChange,
  }: PaginationProps) {
    const handlePrevious = useCallback(() => {
      if (hasPreviousPage) {
        onPageChange(currentPage - 1);
      }
    }, [hasPreviousPage, onPageChange, currentPage]);

    const handleNext = useCallback(() => {
      if (hasNextPage) {
        onPageChange(currentPage + 1);
      }
    }, [hasNextPage, onPageChange, currentPage]);

    // Generate page numbers to display - 使用 useMemo 缓存
    const pageNumbers = useMemo(() => {
      const pages: (number | string)[] = [];
      const maxVisible = 5;
      const halfVisible = Math.floor(maxVisible / 2);

      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);

      if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }

      return pages;
    }, [currentPage, totalPages]);

    return (
      <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={!hasPreviousPage}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors ${
            hasPreviousPage
              ? "border-border hover:bg-secondary cursor-pointer"
              : "border-border text-muted-foreground cursor-not-allowed opacity-50"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-muted-foreground">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`px-3 py-2 rounded-lg border transition-colors text-sm ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-secondary cursor-pointer"
                  }`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors ${
            hasNextPage
              ? "border-border hover:bg-secondary cursor-pointer"
              : "border-border text-muted-foreground cursor-not-allowed opacity-50"
          }`}
        >
          <span className="hidden sm:inline text-sm">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Page Info */}
        <div className="text-sm text-muted-foreground ml-2">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // 自定义比较函数：只有在关键 props 真正改变时才重新渲染
    return (
      prevProps.currentPage === nextProps.currentPage &&
      prevProps.totalPages === nextProps.totalPages &&
      prevProps.hasNextPage === nextProps.hasNextPage &&
      prevProps.hasPreviousPage === nextProps.hasPreviousPage
    );
  }
);
