import { useState } from "react";
import { searchUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { users } = await searchUsers({ username, location, minRepos, page: 1 });
    setResults(users);
    setPage(1);
    setLoading(false);
  };

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const { users } = await searchUsers({ username, location, minRepos, page: nextPage });
    setResults((prev) => [...prev, ...users]);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results */}
      <div className="grid gap-4">
        {results.length > 0 && results.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 border p-4 rounded shadow"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="font-bold text-lg">
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  {user.login}
                </a>
              </h2>
              <p>📍 {user.location}</p>
              <p>Repos: {user.public_repos}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {results.length > 0 && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default Search;
