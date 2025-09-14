// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => String(r.id) === String(id)));

  const favorites = useRecipeStore((s) => s.favorites);
  const addFavorite = useRecipeStore((s) => s.addFavorite);
  const removeFavorite = useRecipeStore((s) => s.removeFavorite);

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(recipe.id);

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients ?? '—'}</p>
      <p><strong>Time:</strong> {recipe.time ?? 'N/A'} mins</p>

      <button
        onClick={() => (isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe.id))}
        style={{ marginRight: '12px' }}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <div style={{ marginTop: '12px' }}>
        <Link to={`/edit/${recipe.id}`} style={{ marginRight: '12px' }}>Edit</Link>
        <Link to="/">Back to list</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
