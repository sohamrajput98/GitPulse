import React, { useState, useEffect } from 'react';
import Badge from './Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Award } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfettiEffect from '@/components/fun/ConfettiEffect';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Your FastAPI server address

/**
 * Fetches and displays the list of badges a user has earned by communicating
 * with the GitPulse backend.
 * @param {object} props
 * @param {object} props.userStats - The compiled user statistics to send to the backend.
 */
const BadgeList = ({ userStats }) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!userStats || userStats.public_repos === 0) {
      setLoading(false);
      setBadges([]);
      return;
    };

    const fetchBadges = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/badges/calculate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userStats),
        });

        if (!response.ok) throw new Error('Failed to fetch badges from server.');

        const earnedBadges = await response.json();
        setBadges(earnedBadges);
        
        // Celebrate if the user earned a "Gold" tier badge
        if (earnedBadges.some(b => b.tier === 'Gold')) {
          setShowConfetti(true);
          // Stop confetti after 5 seconds
          const timer = setTimeout(() => setShowConfetti(false), 5000);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Badge fetch error:", error);
        toast.error("Could not calculate badges. Is the backend server running?");
        setBadges([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [userStats]);

  return (
    <Card>
      {showConfetti && <ConfettiEffect />}
      <CardHeader>
        <CardTitle className="flex items-center"><Award className="h-6 w-6 mr-2" /> Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" />
          </div>
        ) : badges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {badges.map((badge) => <Badge key={badge.name} badge={badge} />)}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No badges earned yet. Keep contributing!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgeList;