import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Search() {
  const [searchRecipes, setSearchRecipes] = useState([]);
  const [error, setError] = useState(null);
  const params = useParams();

  const getSearch = async (search) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      const data = response.data;

      if (data && data.meals) {
        setSearchRecipes(data.meals);
        setError(null);
      } else {
        setSearchRecipes([]);
        setError("English mf, do you speak it?");
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
      setSearchRecipes([]);
      setError("Error fetching meals. Testa igen senare!");
    }
  };

  useEffect(() => {
    getSearch(params.search);
  }, [params.search]);

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {searchRecipes.map((item) => (
        <Link to={`/recipe/${item.idMeal}`} key={item.idMeal}>
          <div className="imageMeals">
            <img src={item.strMealThumb} alt="" className="mealSelection" />
          </div>
        </Link>
      ))}
    </div>
  );
}
export default Search;
