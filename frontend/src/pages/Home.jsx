import { useState, Fragment } from 'react';
import { useGitHubAPI } from '@/hooks/useGitHubAPI';
import { getProfileStats } from '@/utils/dataFormatter';

// Modular Component Imports
import ProfileCard from '@/components/profile/ProfileCard';
import RepoList from '@/components/repo/RepoList';
import LanguagePieChart from '@/components/charts/LanguagePieChart';
import ContributionCalendar from '@/components/charts/ContributionCalendar';
import BadgeList from '@/components/badges/BadgeList';
import ActivityTimeline from '@/components/charts/ActivityTimeline';

// UI & Icons
import { Input } from '@/components/ui/input'; 
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Frown, BarChartHorizontalBig } from 'lucide-react';

const Home = () => {
  const [username, setUsername] = useState('');
  const { data, loading, error, fetchUser } = useGitHubAPI();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchUser(username.trim());
    }
  };

  const renderContent = () => {
    if (loading) {
      return <DashboardSkeleton />;
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <Frown className="mx-auto h-16 w-16 text-destructive" />
          <h2 className="mt-4 text-xl font-semibold text-destructive">An Error Occurred</h2>
          <p className="mt-2 text-muted-foreground">{error}</p>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="text-center py-20">
          <BarChartHorizontalBig className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-semibold">Welcome to GitPulse</h2>
          <p className="mt-2 text-muted-foreground">
            Enter a GitHub username to generate an interactive analytics dashboard.
          </p>
        </div>
      );
    }
    
    // Once data is available, prepare props for child components
    const userStats = getProfileStats(data.profile, data.repos);
    const statsForBadges = {
      total_stars: data.repos.reduce((acc, repo) => acc + repo.stargazers_count, 0),
      public_repos: data.profile.public_repos || 0,
      followers: data.profile.followers || 0,
      // NOTE: A true commit count is API-intensive. This is a realistic approximation for the badge service.
      total_commits: data.repos.length * 15, 
      languages: data.languages,
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Profile, Badges, Languages */}
        <aside className="lg:col-span-1 space-y-8">
          <ProfileCard profile={data.profile} stats={userStats} />
          <BadgeList userStats={statsForBadges} />
          <LanguagePieChart languages={data.languages} />
        </aside>

        {/* Right Column: Calendar, Activity, Repositories */}
        <section className="lg:col-span-2 space-y-8">
          <ContributionCalendar username={data.profile.login} />
          <ActivityTimeline username={data.profile.login} />
          <RepoList repos={data.repos} />
        </section>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username... (e.g., torvalds)"
              className="pl-10 text-lg h-12"
              disabled={loading}
              aria-label="GitHub Username Input"
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto h-12 text-md" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Profile'}
          </Button>
        </form>
      </div>
      
      {/* Main Content Area */}
      {renderContent()}
    </div>
  );
};

// A page-specific skeleton component for a better loading experience
const DashboardSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
    <div className="lg:col-span-1 space-y-8">
      {/* Profile Card Skeleton */}
      <div className="space-y-4 p-6 border rounded-lg">
        <div className="flex items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" />
        </div>
      </div>
      {/* Badges & Languages Skeleton */}
      <Skeleton className="h-64 w-full rounded-lg" />
      <Skeleton className="h-80 w-full rounded-lg" />
    </div>
    <div className="lg:col-span-2 space-y-8">
      {/* Calendar, Activity & Repos Skeleton */}
      <Skeleton className="h-48 w-full rounded-lg" />
      <Skeleton className="h-56 w-full rounded-lg" />
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  </div>
);

export default Home;