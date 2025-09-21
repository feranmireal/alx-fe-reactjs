// src/components/UserProfile.jsx
import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-20 h-20 rounded-full mx-auto"
      />
      <h2 className="text-lg font-bold text-center mt-2">{user.login}</h2>
      <p className="text-center text-gray-600">{user.location || "N/A"}</p>
      <p className="text-center text-gray-600">
        Repos: {user.public_repos ?? "N/A"}
      </p>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline block text-center mt-2"
      >
        View Profile
      </a>
    </div>
  );
};

export default UserProfile;
