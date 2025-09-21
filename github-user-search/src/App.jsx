import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import { getUser } from "./services/githubApi";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (username) => {
    setLoading(true);
    setError("");
    setUser(null);
    try {
      const data = await getUser(username);
      setUser(data);
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 404) setError("User not found");
      else setError("Error fetching user. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && <UserCard user={user} />}
      {!user && !loading && !error && (
        <p>Type a GitHub username and press Search (e.g., torvalds).</p>
      )}
    </div>
  );
}
