import axios from "axios";

const API_BASE = "https://api.github.com";
const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

// create axios instance with optional token header
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: token ? { Authorization: `token ${token}` } : {},
});

export async function getUser(username) {
  const response = await axiosInstance.get(`/users/${username}`);
  return response.data;
}
