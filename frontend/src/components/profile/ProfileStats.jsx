import React from 'react';
import { GitCommit, Star, GitFork, BookCopy, Users } from 'lucide-react';
import HoverTooltip from '@/components/fun/HoverTooltip';

// A map to associate stat names with specific icons for a professional look.
const iconMap = {
  repo: <BookCopy className="h-6 w-6 text-primary" />,
  followers: <Users className="h-6 w-6 text-primary" />, // Imported from lucide-react in ProfileBio
  star: <Star className="h-6 w-6 text-primary" />,
  fork: <GitFork className="h-6 w-6 text-primary" />,
};

/**
 * Renders a grid of key user statistics.
 * @param {object} props
 * @param {Array<object>} props.stats - Array of stat objects with { name, value, icon }.
 */
const ProfileStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-6">
      {stats.map((stat) => (
        <HoverTooltip key={stat.name} text={`Total ${stat.name}`}>
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-4 text-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
            {iconMap[stat.icon] || <GitCommit className="h-6 w-6 text-primary" />}
            <span className="text-2xl font-bold mt-2">{stat.value}</span>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.name}</p>
          </div>
        </HoverTooltip>
      ))}
    </div>
  );
};

export default ProfileStats;