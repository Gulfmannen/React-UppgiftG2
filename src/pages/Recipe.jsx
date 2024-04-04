import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Recipe() {
  const [details, setDetails] = useState({});
  const location = useLocation();

  const fetchDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const detailData = response.data;
      if (detailData.meals && detailData.meals.length > 0) {
        setDetails(detailData.meals[0]);
      } else {
        console.error("No recipe found for ID:", id);
        setDetails({});
      }
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  useEffect(() => {
    const lastPartOfLocationPath = location.pathname.split("/").slice(-1)[0];
    fetchDetails(lastPartOfLocationPath);
  }, [location]);

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = details[`strIngredient${i}`];
      const measure = details[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="main">
      <h1>{details.strMeal}</h1>
      <div className="recipe-container">
        <div className="recipe-list">
          <h2>Ingredients:</h2>
          <ul>
            {getIngredients().map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <img src={details.strMealThumb} alt="" className="recipe-img" />
        <div className="instructionBox">
          <h2>Cooking Directions:</h2>
          <div className="box">
            <p>{details.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
