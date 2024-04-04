import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import Searched from "./Search";
import Home from "./Home";
import Meals from "./Meals";
import Recipe from "./Recipe";

function Pages() {
  const [mealsTypes, setMealsTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealsTypes = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setMealsTypes(response.data.categories);
        setError(null);
      } catch (error) {
        console.error("Error fetching meal types:", error);
        setError("Error fetching meal types. Please try again later.");
      }
    };

    fetchMealsTypes();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/searched/:search" element={<Searched />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route
        path="/meals/:type"
        element={<Meals mealsTypes={mealsTypes} error={error} />}
      />
    </Routes>
  );
}

export default Pages;
