import { useState, Fragment } from 'react';
import { useGitHubAPI } from '@/hooks/useGitHubAPI';
import { getProfileStats } from '@/utils/dataFormatter';

// Modular Component Imports
import ProfileCard from '@/components/profile/ProfileCard';
import LanguagePieChart from '@/components/charts/LanguagePieChart';
import RepoList from '@/components/repo/RepoList';

// UI & Icons
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Frown, GitCompare } from 'lucide-react';

const Comparison = () => {
  const [usernames, setUsernames] = useState({ user1: '', user2: '' });
  
  const { data: data1, loading: loading1, error: error1, fetchUser: fetchUser1 } = useGitHubAPI();
  const { data: data2, loading: loading2, error: error2, fetchUser: fetchUser2 } = useGitHubAPI();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsernames(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernames.user1.trim()) fetchUser1(usernames.user1.trim());
    if (usernames.user2.trim()) fetchUser2(usernames.user2.trim());
  };

  const isLoading = loading1 || loading2;
  const hasData = data1 || data2;
  const isInitialState = !isLoading && !hasData;

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
          <Input name="user1" value={usernames.user1} onChange={handleInputChange} placeholder="First Username..." className="h-12" disabled={isLoading} aria-label="First GitHub Username" />
          <GitCompare className="h-6 w-6 text-muted-foreground flex-shrink-0" />
          <Input name="user2" value={usernames.user2} onChange={handleInputChange} placeholder="Second Username..." className="h-12" disabled={isLoading} aria-label="Second GitHub Username" />
          <Button type="submit" className="w-full md:w-auto h-12 text-md" disabled={isLoading}>
            {isLoading ? 'Comparing...' : 'Compare Profiles'}
          </Button>
        </form>
      </div>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UserColumn data={data1} loading={loading1} error={error1} />
        <UserColumn data={data2} loading={loading2} error={error2} />
      </div>

      {isInitialState && (
        <div className="text-center py-20 col-span-1 lg:col-span-2">
          <Users className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-semibold">Profile Comparison</h2>
          <p className="mt-2 text-muted-foreground">Enter two GitHub usernames for a side-by-side analysis.</p>
        </div>
      )}
    </div>
  );
};

// A page-specific component to render one user's column
const UserColumn = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4 p-6 border rounded-lg">
          <div className="flex items-center gap-4"><Skeleton className="h-24 w-24 rounded-full" /><div className="space-y-2"><Skeleton className="h-6 w-40" /><Skeleton className="h-4 w-32" /></div></div>
          <div className="grid grid-cols-2 gap-4 pt-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
        </div>
        <Skeleton className="h-80 w-full rounded-lg" />
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center text-center p-8 h-full border rounded-lg bg-card">
        <div>
          <Frown className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold text-destructive">Could Not Load Profile</h3>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg bg-card/50">
        <p className="text-muted-foreground">Waiting for user...</p>
      </div>
    );
  }

  // Once data is available, render the components
  const userStats = getProfileStats(data.profile, data.repos);
  return (
    <div className="space-y-8">
      <ProfileCard profile={data.profile} stats={userStats} />
      <LanguagePieChart languages={data.languages} />
      <RepoList repos={data.repos} isComparisonView={true} />
    </div>
  );
};

export default Comparison;