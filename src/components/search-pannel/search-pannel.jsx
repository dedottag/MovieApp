import React from "react";
import "./search-pannel.css";

const SearchPannel = ({ setSearchValue, value, debounce, setLoading }) => {
  const handleChange = (e) => {
    setLoading(true);
    setSearchValue(e.target.value);
  };
  return (
    <div className="search-pannel-container">
      <input
        className="search-pannel"
        placeholder="tap to search..."
        value={value}
        onKeyUp={debounce(handleChange, 500)}
      />
    </div>
  );
};

export default SearchPannel;
