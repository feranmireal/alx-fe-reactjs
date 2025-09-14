// src/components/FavoritesList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore((s) =>
    s.favorites.map((id) => s.recipes.find((r) => r.id === id))
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map(
            (recipe) =>
              recipe && (
                <li key={recipe.id}>
                  <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
