import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import AddRecipeForm from './AddRecipeForm';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      <h1>Recipes</h1>
      <AddRecipeForm />
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
