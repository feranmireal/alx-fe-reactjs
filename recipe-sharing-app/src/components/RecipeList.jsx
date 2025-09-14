// src/components/RecipeList.jsx
import React from 'react';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {filteredRecipes.map((recipe, index) => (
            <li key={index}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <p><strong>Time:</strong> {recipe.time} mins</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
