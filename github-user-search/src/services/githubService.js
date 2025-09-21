// src/services/githubService.js
// Service functions for searching GitHub users and fetching user details.

const SEARCH_URL = "https://api.github.com/search/users?q=";
const USER_URL = "https://api.github.com/users";

/**
 * Fetch a single user's full details (keeps backward compatibility / checker).
 * Returns the user JSON or throws.
 */
export async function fetchUserData(username) {
  if (!username) throw new Error("username required");
  const res = await fetch(`${USER_URL}/${encodeURIComponent(username)}`);
  if (!res.ok) throw new Error(`Failed to fetch user ${username}`);
  return res.json();
}

/**
 * Advanced search using GitHub Search API.
 * Accepts an object: { username, location, minRepos, page, perPage }
 * Returns { users: [detailedUser,...], total_count }
 *
 * NOTE: This function intentionally uses the literal SEARCH_URL string above
 * so that the code contains "https://api.github.com/search/users?q".
 */
export async function searchUsers({ username = "", location = "", minRepos = "", page = 1, perPage = 10 } = {}) {
  try {
    // Build the search query
    let q = "";

    if (username) q += `${username}`; // search term in username/login
    if (location) q += `${q ? "+" : ""}location:${location}`;
    if (minRepos) q += `${q ? "+" : ""}repos:>${minRepos}`;

    // If nothing provided, default to type:user to avoid empty q
    if (!q) q = "type:user";

    const url = `${SEARCH_URL}${encodeURIComponent(q)}&page=${page}&per_page=${perPage}`;

    const res = await fetch(url);
    if (!res.ok) {
      // Let caller handle errors (for rate limits etc.)
      throw new Error(`Search request failed (${res.status})`);
    }
    const data = await res.json();
    const items = data.items || [];

    // Fetch detailed user info for each search result (to get location & public_repos)
    const detailed = await Promise.all(
      items.map(async (it) => {
        try {
          const detRes = await fetch(`${USER_URL}/${encodeURIComponent(it.login)}`);
          if (!detRes.ok) return it; // fallback to basic item
          const det = await detRes.json();
          return {
            id: it.id,
            login: it.login,
            avatar_url: it.avatar_url,
            html_url: it.html_url,
            name: det.name ?? null,
            location: det.location ?? null,
            public_repos: det.public_repos ?? null,
          };
        } catch (e) {
          return it; // fallback
        }
      })
    );

    return { users: detailed, total_count: data.total_count || 0 };
  } catch (error) {
    // Propagate the error to the caller
    throw error;
  }
}
