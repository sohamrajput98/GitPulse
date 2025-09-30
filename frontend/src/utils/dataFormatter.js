import { formatDistanceToNow } from 'date-fns';

/**
 * A collection of pure functions to transform raw data from the GitHub API
 * into structures that are easy to use in UI components like charts and lists.
 */

/**
 * Calculates language distribution and prepares it for a Recharts pie chart.
 * @param {object} languages - Object of language names to bytes of code.
 * @returns {Array<object>} Formatted data, e.g., [{ name: 'JavaScript', value: 4500, color: '#f1e05a' }]
 */
export const formatLanguageDataForPieChart = (languages) => {
  if (!languages || Object.keys(languages).length === 0) return [];
  
  const totalBytes = Object.values(languages).reduce((acc, bytes) => acc + bytes, 0);

  const languageColors = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219',
    HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', Go: '#00ADD8', C: '#555555',
    Ruby: '#701516', 'C++': '#f34b7d', CSharp: '#178600', PHP: '#4F5D95',
    Rust: '#dea584', Vue: '#41b883', Swift: '#F54A2A', Kotlin: '#A97BFF', Other: '#ededed'
  };

  return Object.entries(languages)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / totalBytes) * 100).toFixed(2),
      color: languageColors[name] || languageColors.Other,
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Calculates aggregate statistics from profile and repository data.
 * @param {object} profile - The user's profile object from the GitHub API.
 * @param {Array<object>} repos - The user's array of repository objects.
 * @returns {Array<object>} An array of stat objects for display.
 */
export const getProfileStats = (profile, repos) => {
  if (!profile || !repos) return [];
  
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
  
  return [
    { name: 'Public Repos', value: profile.public_repos.toLocaleString(), icon: 'repo' },
    { name: 'Followers', value: profile.followers.toLocaleString(), icon: 'followers' },
    { name: 'Total Stars', value: totalStars.toLocaleString(), icon: 'star' },
    { name: 'Total Forks', value: totalForks.toLocaleString(), icon: 'fork' },
  ];
};

/**
 * Formats a number into a compact string (e.g., 1500 -> 1.5k).
 * @param {number} num - The number to format.
 * @returns {string|number} The formatted number string or the original number.
 */
export const formatCompactNumber = (num) => {
  if (num > 999) return `${(num / 1000).toFixed(1)}k`;
  return num;
};

/**
 * Formats a date string into a "time ago" string (e.g., "3 months ago").
 * @param {string} dateString - The ISO date string.
 * @returns {string} The formatted relative time string.
 */
export const formatTimeAgo = (dateString) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

/**
 * Processes the last 90 days of GitHub events into a summary for a bar chart.
 * @param {Array<object>} events - The array of event objects from the GitHub API.
 * @returns {Array<object>} Data structured for a Recharts bar chart, e.g., [{ name: 'Commits', count: 50 }]
 */
export const formatEventsForBarChart = (events) => {
  if (!events || events.length === 0) return [];

  const eventCounts = events.reduce((acc, event) => {
    let type = 'Other';
    if (event.type === 'PushEvent') type = 'Commits';
    if (event.type === 'PullRequestEvent') type = 'Pull Requests';
    if (event.type === 'IssuesEvent') type = 'Issues';
    if (event.type === 'IssueCommentEvent') type = 'Comments';
    if (event.type === 'CreateEvent' && event.payload.ref_type === 'repository') type = 'New Repos';
    
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(eventCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};
