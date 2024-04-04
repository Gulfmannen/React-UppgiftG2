import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  const getMeals = async (mealsCategory) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealsCategory}`
      );
      if (response.data && response.data.meals) {
        setMeals(response.data.meals);
        setError(null);
      } else {
        setMeals([]);
        setError("Tyvärr, hittade inga maträtter.");
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
      setMeals([]);
      setError("Error fetching meals. Testa igen senare!.");
    }
  };

  useEffect(() => {
    const lastPartOfLocationPath = location.pathname.split("/").slice(-1)[0];
    getMeals(lastPartOfLocationPath);
  }, [location]);

  return (
    <div className="recipe-container">
      {error && <div className="error">Error: {error}</div>}
      {meals &&
        meals.map((item) => (
          <Link key={item.idMeal} to={"/recipe/" + item.idMeal}>
            <div className="imageMeals">
              <div className="meal-bg"></div>
              <div className="meal-text">{item.strMeal}</div>
              <img
                src={item.strMealThumb}
                alt={item.strCategory}
                className="mealSelection"
              />
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Meals;
