import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Searchbar() {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/search/${input}`);

      navigate("/search/" + input);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleSearchButtonClick = () => {
    submitHandler({ preventDefault: () => {} });
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
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Sök käk här..på englska.."
            value={input}
            className="topnav"
          />
          <button type="submit" onClick={handleSearchButtonClick}>
            Sök
          </button>
        </form>
      </div>
    </div>
  );
}

export default Searchbar;
