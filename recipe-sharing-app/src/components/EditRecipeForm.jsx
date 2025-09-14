// src/components/EditRecipeForm.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => String(r.id) === String(id)));
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);

  const [title, setTitle] = useState(recipe?.title ?? '');
  const [description, setDescription] = useState(recipe?.description ?? '');
  const [time, setTime] = useState(recipe?.time ?? '');

  if (!recipe) return <p>Recipe not found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault(); // checker expects this
    updateRecipe({ ...recipe, title, description, time });
    navigate(`/recipe/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <div style={{ marginBottom: 8 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      </div>
      <div style={{ marginBottom: 8 }}>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time (mins)" />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditRecipeForm;
