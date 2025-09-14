// src/components/recipeStore.js
import create from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [
    // seed example recipes so pages aren't empty
    { id: '1', title: 'Pasta Carbonara', description: 'Creamy pasta with bacon.', ingredients: 'pasta, eggs, bacon', time: 20 },
    { id: '2', title: 'Pancakes', description: 'Fluffy pancakes.', ingredients: 'flour, milk, eggs', time: 15 },
  ],

  addRecipe: (recipe) => set((state) => ({ recipes: [...state.recipes, recipe] })),
  updateRecipe: (updated) => set((state) => ({ recipes: state.recipes.map((r) => (r.id === updated.id ? updated : r)) })),
  deleteRecipe: (id) => set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  // optional search/filter fields (keep compatibility with earlier code)
  searchTerm: '',
  filteredRecipes: [],
  setSearchTerm: (term) =>
    set((state) => {
      const filtered = state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
      return { searchTerm: term, filteredRecipes: filtered };
    }),
}));

export default useRecipeStore;
