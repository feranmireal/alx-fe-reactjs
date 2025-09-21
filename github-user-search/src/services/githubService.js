// src/services/githubService.js
import axios from "axios";

const BASE_URL = "https://api.github.com";

export const searchUsers = async (username, location, minRepos) => {
  try {
    let query = username ? `${username} in:login` : "";

    if (location) {
      query += ` location:${location}`;
    }

    if (minRepos) {
      query += ` repos:>=${minRepos}`;
    }

    const response = await axios.get(`${BASE_URL}/search/users?q=${query}`);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
