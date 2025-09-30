import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Star, GitFork, Code2, Scale, Calendar } from 'lucide-react';
import { formatCompactNumber, formatTimeAgo } from '@/utils/dataFormatter';

/**
 * Displays detailed information for a single repository.
 * @param {object} props
 * @param {object} props.repo - The repository object from the GitHub API.
 */
const RepoCard = ({ repo }) => {
  return (
    <Card className="hover:border-primary transition-colors duration-300 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="truncate">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {repo.name}
          </a>
        </CardTitle>
        <CardDescription className="pt-2 h-12 overflow-hidden text-ellipsis">
          {repo.description || 'No description provided.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        {/* Repo Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center" title="Stars">
            <Star className="h-4 w-4 mr-2 text-primary" /> {formatCompactNumber(repo.stargazers_count)}
          </div>
          <div className="flex items-center" title="Forks">
            <GitFork className="h-4 w-4 mr-2 text-primary" /> {formatCompactNumber(repo.forks_count)}
          </div>
          <div className="flex items-center" title="Language">
            <Code2 className="h-4 w-4 mr-2 text-primary" /> {repo.language || 'N/A'}
          </div>
          <div className="flex items-center" title="Size">
            <Scale className="h-4 w-4 mr-2 text-primary" /> {repo.size.toLocaleString()} KB
          </div>
        </div>
        {/* Last Updated Timestamp */}
        <div className="text-xs text-muted-foreground/80 mt-4 flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          Updated {formatTimeAgo(repo.pushed_at)}
        </div>
      </CardContent>
    </Card>
  );
};

export default RepoCard;