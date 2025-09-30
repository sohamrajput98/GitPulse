import React, { useState, useMemo } from 'react';
import RepoCard from './RepoCard';
import RepoFilter from './RepoFilter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Archive } from 'lucide-react';

const REPOS_PER_PAGE = 6;

/**
 * Manages and displays the list of repositories with filtering, sorting, and pagination.
 * @param {object} props
 * @param {Array<object>} props.repos - The array of all repository objects.
 * @param {boolean} [props.isComparisonView=false] - Renders a more compact version for the comparison page.
 */
const RepoList = ({ repos, isComparisonView = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('stargazers_count');
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize the filtering and sorting for performance.
  // This expensive operation only re-runs when its dependencies change.
  const filteredAndSortedRepos = useMemo(() => {
    return repos
      .filter(repo => repo.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortKey === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortKey === 'pushed_at') {
          return new Date(b.pushed_at) - new Date(a.pushed_at);
        }
        return b[sortKey] - a[sortKey];
      });
  }, [repos, searchTerm, sortKey]);

  const totalPages = Math.ceil(filteredAndSortedRepos.length / REPOS_PER_PAGE);
  const paginatedRepos = filteredAndSortedRepos.slice(
    (currentPage - 1) * REPOS_PER_PAGE,
    currentPage * REPOS_PER_PAGE
  );
  
  const handlePageChange = (direction) => {
    setCurrentPage(prev => Math.max(1, Math.min(prev + direction, totalPages)));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Archive className="h-6 w-6 mr-2" />
          Repositories ({filteredAndSortedRepos.length})
        </CardTitle>
        <div className="pt-4">
          <RepoFilter onSearchChange={setSearchTerm} onSortChange={setSortKey} />
        </div>
      </CardHeader>
      <CardContent>
        {paginatedRepos.length > 0 ? (
          <div className={`grid grid-cols-1 ${isComparisonView ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
            {paginatedRepos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No repositories found matching your criteria.</p>
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={() => handlePageChange(-1)} disabled={currentPage === 1} aria-label="Previous Page">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button variant="outline" size="icon" onClick={() => handlePageChange(1)} disabled={currentPage === totalPages} aria-label="Next Page">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RepoList;