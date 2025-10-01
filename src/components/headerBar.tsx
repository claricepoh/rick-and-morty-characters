import React, {useState} from "react";

interface Props {
  page: number;
  totalPages: number;
  inputName: string; 
  onPrev: () => void;
  onNext: () => void;
  onGoToPage: (targetPage: number) => void;
  onSearchName: (filterName: string) => void;
};

const HeaderBar: React.FC<Props> = ({ page, totalPages, inputName, onPrev, onNext, onGoToPage, onSearchName }) => {
  const [inputPage, setInputPage] = useState<string>("");
  
  const handleInputPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const pageNum = Number(val);

    // allow empty string so user can clear
    if (val === "") {
      setInputPage("");
      return;
    }

    // only update state if in valid range
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setInputPage(val);
    }
  };

  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onSearchName(val);
  };

  const handleGoTo = () => {
    const num = Number(inputPage);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      onGoToPage(num);
      setInputPage("");  // reset
    } else {
      alert(`Please enter page number between 1 and ${totalPages}`);
    }
  };

  
  const buttonClassName: string =
    "px-6 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed";

  return  (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold mb-6 sm:mb-0">
        The Rick and Morty Characters
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

        {/* Go to page */}
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          placeholder={`1 - ${totalPages}`}
          onChange={handleInputPageChange}
          onInput={handleInputPageChange}
          className="w-20 px-2 py-1 border rounded text-sm"
        />
        <button
          onClick={handleGoTo}
          className="px-3 py-1 rounded bg-blue-200 hover:bg-blue-300">
          Go
        </button>

        {/* Name Search filter */}
        <input
          type="text"
          value={inputName}
          onChange={handleInputNameChange}
          placeholder="Search name..."
          className="w-30 px-2 py-1 border rounded text-sm"
        />
      </div>
    </div>
  );
};

export default HeaderBar;