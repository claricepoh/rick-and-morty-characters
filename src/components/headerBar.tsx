import React from "react";

interface Props {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const HeaderBar: React.FC<Props> = ({ page, totalPages, onPrev, onNext }) => {
  const buttonClassName: string = 
    "px-6 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed";  
  
    return  (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold mb-6 sm:mb-0">
        The Ricky and Morty Characters
      </h1>

      <div className="flex items-center gap-4">
        <button onClick={onPrev} disabled={page <= 1} className={buttonClassName}> 
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {page} / {totalPages}
        </span>
        <button onClick={onNext} disabled={page >= totalPages} className={buttonClassName}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HeaderBar;