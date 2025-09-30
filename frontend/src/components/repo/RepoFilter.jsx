import React from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Search } from 'lucide-react';

/**
 * Provides UI for filtering and sorting the repository list.
 * @param {object} props
 * @param {function} props.onSearchChange - Callback for search input changes.
 * @param {function} props.onSortChange - Callback for sort option changes.
 */
const RepoFilter = ({ onSearchChange, onSortChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search repositories..."
          className="pl-10 h-10"
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search Repositories"
        />
      </div>
      <Select
        defaultValue="stargazers_count"
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort Repositories"
      >
        <option value="stargazers_count">Sort by Stars</option>
        <option value="forks_count">Sort by Forks</option>
        <option value="pushed_at">Sort by Last Updated</option>
        <option value="size">Sort by Size</option>
        <option value="name">Sort by Name (A-Z)</option>
      </Select>
    </div>
  );
};

export default RepoFilter;