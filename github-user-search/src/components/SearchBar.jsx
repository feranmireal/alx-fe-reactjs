import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    onSearch(username.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username (e.g., torvalds)"
        style={{ padding: "8px", width: "300px", marginRight: "8px" }}
      />
      <button type="submit">Search</button>
    </form>
  );
}
