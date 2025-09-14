// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => String(r.id) === String(id)));

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients ?? '—'}</p>
      <p><strong>Time:</strong> {recipe.time ?? 'N/A'} mins</p>
      <div style={{ marginTop: '12px' }}>
        <Link to={`/edit/${recipe.id}`} style={{ marginRight: '12px' }}>Edit</Link>
        <Link to="/">Back to list</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
