// src/components/recipeStore.js
import create from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [
    { id: '1', title: 'Pasta Carbonara', description: 'Creamy pasta with bacon.', ingredients: 'pasta, eggs, bacon', time: 20 },
    { id: '2', title: 'Pancakes', description: 'Fluffy pancakes.', ingredients: 'flour, milk, eggs', time: 15 },
    { id: '3', title: 'Salad Bowl', description: 'Healthy green salad.', ingredients: 'lettuce, tomato, cucumber', time: 10 },
  ],

  // favorites + recommendations
  favorites: [],
  recommendations: [],

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, recipeId])],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  generateRecommendations: () =>
    set((state) => {
      // mock recommendations: suggest non-favorited recipes randomly
      const recommended = state.recipes.filter(
        (r) => !state.favorites.includes(r.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),

  // keep existing actions
  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),
  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === updated.id ? updated : r)),
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),

  // search support
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
