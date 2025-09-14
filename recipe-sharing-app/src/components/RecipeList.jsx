// src/components/RecipeList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  // prefer filteredRecipes if present, otherwise show all recipes
  const recipes = useRecipeStore((s) =>
    s.filteredRecipes && s.filteredRecipes.length ? s.filteredRecipes : s.recipes
  );

  return (
    <div>
      <h2>Recipe List</h2>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              style={{
                marginBottom: '16px',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
              }}
            >
              <h3 style={{ margin: 0 }}>
                <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: '#222' }}>
                  {recipe.title}
                </Link>
              </h3>

              <p style={{ margin: '8px 0' }}>{recipe.description}</p>

              <p style={{ margin: '4px 0', fontSize: '0.9em' }}>
                <strong>Time:</strong> {recipe.time ?? 'N/A'} mins
              </p>

              <div style={{ marginTop: '8px' }}>
                <Link to={`/recipe/${recipe.id}`} style={{ marginRight: '12px' }}>View</Link>
                <Link to={`/edit/${recipe.id}`}>Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
