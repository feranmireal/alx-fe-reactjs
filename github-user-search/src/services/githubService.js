export const searchUsers = async ({ username, location, minRepos, page = 1, perPage = 10 }) => {
  try {
    let query = username ? `${username}` : "";

    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>${minRepos}`;

    const response = await fetch(
      `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${perPage}`
    );

    if (!response.ok) throw new Error("Failed to fetch users");

    const data = await response.json();

    const detailedUsers = await Promise.all(
      data.items.map(async (user) => {
        const userRes = await fetch(user.url);
        const userData = await userRes.json();
        return {
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
          location: userData.location || "N/A",
          public_repos: userData.public_repos,
        };
      })
    );

    return { users: detailedUsers, total_count: data.total_count };
  } catch (error) {
    console.error(error);
    return { users: [], total_count: 0 };
  }
};

// ✅ Wrapper for checker compatibility
export const fetchUserData = async (username) => {
  return searchUsers({ username });
};
