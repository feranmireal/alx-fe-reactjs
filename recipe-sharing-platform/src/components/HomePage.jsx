import { Link } from "react-router-dom";

// Replace the card wrapper
<Link to={`/recipe/${recipe.id}`} key={recipe.id}>
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
    <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded-md mb-4" />
    <h2 className="text-xl font-bold text-blue-600 mb-2">{recipe.title}</h2>
    <p className="text-gray-600">{recipe.summary}</p>
  </div>
</Link>
