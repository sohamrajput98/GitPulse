import React from 'react';
import HoverTooltip from '@/components/fun/HoverTooltip';
import { cn } from '@/lib/utils';

const tierStyles = {
  Bronze: 'border-yellow-700/80 hover:border-yellow-600/80',
  Silver: 'border-gray-400/80 hover:border-gray-300/80',
  Gold: 'border-yellow-500/80 hover:border-yellow-400/80 shadow-yellow-500/20',
  Default: 'border-secondary hover:border-accent',
};

/**
 * Displays a single achievement badge with tier-specific styling.
 * @param {object} props
 * @param {object} props.badge - The badge object with name, description, icon, and tier.
 */
const Badge = ({ badge }) => {
  const style = tierStyles[badge.tier] || tierStyles.Default;

  return (
    <HoverTooltip text={badge.description}>
      <div
        className={cn(
          'flex items-center p-3 rounded-lg bg-secondary border-2 transition-all duration-300 hover:bg-accent hover:shadow-lg',
          style
        )}
      >
        <span className="text-3xl mr-3">{badge.icon}</span>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{badge.name}</p>
          <p className="text-xs text-muted-foreground">{badge.tier} Tier</p>
        </div>
      </div>
    </HoverTooltip>
  );
};

export default Badge;