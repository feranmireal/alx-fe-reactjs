import axios from "axios";

const API_BASE = "https://api.github.com";
const token = import.meta.env.VITE_APP_GITHUB_API_KEY || "";

// axios instance with optional auth header
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: token ? { Authorization: `token ${token}` } : {},
});

/**
 * Fetch single user details (task 1 style)
 * name required by earlier check: fetchUserData
 */
export async function fetchUserData(username) {
  if (!username) throw new Error("username required");
  const res = await axiosInstance.get(`/users/${username}`);
  return res.data;
}

/**
 * Advanced search using the search/users endpoint.
 * Returns { total_count, items: [ { ...user, location, public_repos } ] }
 * Accepts page & per_page for pagination.
 */
export async function fetchAdvancedUserSearch(username = "", location = "", minRepos = "", page = 1, per_page = 10) {
  // Build q param according to GitHub search syntax
  let qParts = [];

  if (username) {
    // search in username/login
    qParts.push(`${username} in:login`);
  }
  if (location) {
    qParts.push(`location:${location}`);
  }
  if (minRepos) {
    qParts.push(`repos:>=${minRepos}`);
  }

  // If nothing given, default to searching for users (prevent empty q)
  const q = qParts.length ? qParts.join(" ") : "type:user";

  // perform search
  const searchRes = await axiosInstance.get(`/search/users`, {
    params: { q, page, per_page }
  });

  const items = searchRes.data.items || [];

  // Fetch details for each found user to get location & public_repos
  const detailedItems = await Promise.all(
    items.map(async (u) => {
      try {
        const detailRes = await axiosInstance.get(`/users/${u.login}`);
        return {
          ...u,
          location: detailRes.data.location || null,
          public_repos: detailRes.data.public_repos ?? null,
          name: detailRes.data.name || null,
        };
      } catch (e) {
        // If detail fetch fails, return the basic item
        return u;
      }
    })
  );

  return {
    total_count: searchRes.data.total_count || 0,
    items: detailedItems,
  };
}
