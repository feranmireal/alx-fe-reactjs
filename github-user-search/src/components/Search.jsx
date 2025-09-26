import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {userData && (
          <div>
            <img src={userData.avatar_url} alt={userData.login} width="100" />
            <h3>{userData.name || userData.login}</h3>
            <a href={userData.html_url} target="_blank" rel="noreferrer">
              View Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
