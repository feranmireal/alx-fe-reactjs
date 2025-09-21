import React, { useState } from "react";
import { fetchAdvancedUserSearch } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [totalCount, setTotalCount] = useState(0);

  const runSearch = async (pageToLoad = 1, append = false) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchAdvancedUserSearch(username.trim(), location.trim(), minRepos, pageToLoad, perPage);
      const items = res.items || [];
      setTotalCount(res.total_count || 0);

      if (append) {
        setUsers((prev) => [...prev, ...items]);
      } else {
        setUsers(items);
      }

      if (!items.length && pageToLoad === 1) {
        setError("Looks like we cant find the user");
      }

      setPage(pageToLoad);
    } catch (err) {
      console.error(err);
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // reset page and run search
    runSearch(1, false);
  };

  const handleLoadMore = () => {
    runSearch(page + 1, true);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              className="p-2 border rounded"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Minimum repositories"
              type="number"
              min="0"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setUsername("");
                setLocation("");
                setMinRepos("");
                setUsers([]);
                setError("");
                setPage(1);
                setTotalCount(0);
              }}
              className="px-4 py-2 border rounded"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="mt-6">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && users.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Showing {users.length} of {totalCount} results</p>
              <ul className="space-y-3">
                {users.map((u) => (
                  <li key={u.id} className="bg-white p-4 rounded shadow flex gap-4 items-center">
                    <img src={u.avatar_url} alt={u.login} className="w-16 h-16 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{u.name || u.login}</h3>
                          <p className="text-sm text-gray-600">@{u.login}</p>
                        </div>
                        <a
                          href={u.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Profile
                        </a>
                      </div>

                      <div className="mt-2 text-sm text-gray-700">
                        <span className="mr-4">Repos: <strong>{u.public_repos ?? "—"}</strong></span>
                        <span>Location: <strong>{u.location ?? "—"}</strong></span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Load more if there are likely more items */}
              {users.length < totalCount && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-4 py-2 border rounded"
                    disabled={loading}
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
