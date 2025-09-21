export default function UserCard({ user }) {
  if (!user) return null;

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "1rem",
      borderRadius: "6px",
      width: "420px",
      display: "grid",
      gridTemplateColumns: "80px 1fr",
      gap: "12px",
      alignItems: "center"
    }}>
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        width="80"
        height="80"
        style={{ borderRadius: "50%" }}
      />
      <div>
        <h2 style={{ margin: "0.2rem 0" }}>{user.name || user.login}</h2>
        <p style={{ margin: "0.2rem 0" }}>{user.bio}</p>
        <p style={{ margin: "0.2rem 0" }}>
          <strong>Followers:</strong> {user.followers} &nbsp;
          <strong>Following:</strong> {user.following}
        </p>
        <p style={{ margin: "0.2rem 0" }}>
          <a href={user.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
        </p>
      </div>
    </div>
  );
}
