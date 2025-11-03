import React from 'react';
import { cn } from "@/utils/utils";

/**
 * Renders a user's avatar with a consistent style.
 * @param {object} props
 * @param {string} props.avatarUrl - The URL of the user's avatar.
 * @param {string} props.username - The user's GitHub username for alt text.
 * @param {string} [props.className] - Additional classes for styling.
 */
const ProfileAvatar = ({ avatarUrl, username, className }) => {
  return (
    <img
      src={avatarUrl}
      alt={`${username}'s avatar`}
      className={cn(
        "h-24 w-24 rounded-full border-4 border-secondary shadow-lg transition-transform hover:scale-105",
        className
      )}
      loading="lazy"
    />
  );
};

export default ProfileAvatar;