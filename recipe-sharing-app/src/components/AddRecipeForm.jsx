// src/components/AddRecipeForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((s) => s.addRecipe);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      id: Date.now().toString(),
      title,
      description,
      time: time || 'N/A',
    };
    addRecipe(newRecipe);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Recipe</h2>
      <div style={{ marginBottom: 8 }}>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" required />
      </div>
      <div style={{ marginBottom: 8 }}>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" required />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input value={time} onChange={(e)=>setTime(e.target.value)} placeholder="Time (mins)" />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddRecipeForm;
