import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

if (!API_TOKEN) {
  console.warn("VITE_GITHUB_API_TOKEN is not set. You may experience lower API rate limits.");
}

/**
 * A custom hook to fetch and manage all necessary GitHub data for a user.
 * It handles loading states, errors, and API rate limiting gracefully.
 */
export const useGitHubAPI = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async (username) => {
    if (!username) return;

    const toastId = toast.loading(`Fetching @${username}'s Pulse...`);
    setLoading(true);
    setData(null);
    setError(null);
    
    const headers = {
      'Content-Type': 'application/json',
    };
    if (API_TOKEN) {
      headers['Authorization'] = `token ${API_TOKEN}`;
    }

    try {
      // --- Fetch primary user data and all repositories in parallel ---
      const [profileRes, reposRes] = await Promise.all([
        fetch(`${GITHUB_API_BASE_URL}/users/${username}`, { headers }),
        // Fetch up to 100 repos, sorted by last push date to get the most relevant ones.
        fetch(`${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100&sort=pushed`, { headers }),
      ]);

      // --- Gracefully handle rate limiting ---
      if (profileRes.headers.get('x-ratelimit-remaining') === '0') {
        const resetTime = new Date(profileRes.headers.get('x-ratelimit-reset') * 1000);
        throw new Error(`GitHub API rate limit exceeded. Please try again after ${resetTime.toLocaleTimeString()}.`);
      }
      
      // --- Handle user not found or other critical errors ---
      if (profileRes.status === 404) {
        throw new Error(`User '@${username}' not found.`);
      }
      if (!profileRes.ok || !reposRes.ok) {
        throw new Error(`Failed to fetch data. Status: ${profileRes.status}, ${reposRes.status}`);
      }

      const profile = await profileRes.json();
      const repos = (await reposRes.json()).filter(repo => !repo.fork); // Exclude forked repos
      
      // --- Fetch languages for all non-forked repositories in parallel ---
      const languagePromises = repos.map(repo =>
        fetch(repo.languages_url, { headers }).then(res => res.ok ? res.json() : {})
      );
      const languagesData = await Promise.all(languagePromises);

      // --- Aggregate all fetched data into a final structure ---
      const aggregatedData = {
        profile,
        repos,
        // Aggregate language bytes from all repos
        languages: languagesData.reduce((acc, langData) => {
          for (const [lang, bytes] of Object.entries(langData)) {
            acc[lang] = (acc[lang] || 0) + bytes;
          }
          return acc;
        }, {}),
      };
      
      setData(aggregatedData);
      toast.success(`Pulse for @${username} received!`, { id: toastId });

    } catch (err) {
      console.error("GitHub API Error:", err);
      setError(err.message);
      toast.error(err.message, { id: toastId });
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchUser };
};