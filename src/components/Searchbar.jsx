import React, { useState, useRef } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Searchbar() {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/search/${input}`); // Assuming you have an endpoint for search
      // Handle response data as needed, e.g., navigate to search results page
      navigate("/search/" + input);
    } catch (error) {
      console.error("Error searching:", error);
      // Handle error, e.g., show error message to user
    }
  };

  const handleSearchButtonClick = () => {
    submitHandler({ preventDefault: () => {} }); // Invoke submitHandler with a fake event
  };

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <div className="topnav">
        <form onSubmit={submitHandler}>
          <FaSearch />
          <input
            ref={inputRef} // Reference the input element
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Sök käk här..på englska.."
            value={input}
            className="topnav"
          />
          <button type="submit" onClick={handleSearchButtonClick}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Searchbar;
