import { useState } from "react";
import useFetch from "../hooks/useFetch.js";
import Error from "../UI/Error.jsx";
import MealItem from "../UI/MealItem.jsx";

const requestConfig = {};

export default function Meals() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching data...</p>;
  }
  if (error) {
    return <Error title={"Failed to fetch items"} errorMsg={error} />;
  }
  const filteredMeals =
    selectedCategory === "all"
      ? loadedMeals
      : loadedMeals.filter((meal) => meal.category === selectedCategory);
  return (
    <>
      {/* CATEGORY BUTTONS */}
      <div className="meal-categories">
        <button
          className={selectedCategory === "all" ? "active" : ""}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>

        <button
          className={selectedCategory === "veg" ? "active" : ""}
          onClick={() => setSelectedCategory("veg")}
        >
          Veg
        </button>

        <button
          className={selectedCategory === "non-veg" ? "active" : ""}
          onClick={() => setSelectedCategory("non-veg")}
        >
          Non-Veg
        </button>

        <button
          className={selectedCategory === "dessert" ? "active" : ""}
          onClick={() => setSelectedCategory("dessert")}
        >
          Dessert
        </button>

        <button
          className={selectedCategory === "beverage" ? "active" : ""}
          onClick={() => setSelectedCategory("beverage")}
        >
          Beverage
        </button>
      </div>

      {/* MEALS LIST */}
      <ul id="meals">
        {filteredMeals.map((meal) => (
          <MealItem key={meal.id} mealItem={meal} />
        ))}
      </ul>
    </>
  );
}
