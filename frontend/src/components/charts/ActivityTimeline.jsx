import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity } from 'lucide-react';
import { formatEventsForBarChart } from '@/utils/dataFormatter';

const API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

/**
 * A self-contained component that fetches and displays a user's recent public activity.
 * @param {object} props
 * @param {string} props.username - The GitHub username to fetch activity for.
 */
const ActivityTimeline = ({ username }) => {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchActivity = async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (API_TOKEN) headers['Authorization'] = `token ${API_TOKEN}`;
        
        const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers });
        if (!res.ok) throw new Error('Failed to fetch activity data.');

        const events = await res.json();
        const formattedData = formatEventsForBarChart(events);
        setActivityData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [username]);

  const renderContent = () => {
    if (loading) {
      return <Skeleton className="h-[250px] w-full" />;
    }
    if (error || activityData.length === 0) {
      return (
        <div className="h-[250px] flex items-center justify-center">
          <p className="text-muted-foreground">{error || 'No public activity in the last 90 days.'}</p>
        </div>
      );
    }
    return (
      <div className="h-[250px] w-full">
        <ResponsiveContainer>
          <BarChart data={activityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: 'hsl(var(--secondary))' }}
              contentStyle={{
                background: 'hsl(var(--background) / 0.8)',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center"><Activity className="h-6 w-6 mr-2" /> Recent Public Activity</CardTitle>
        <CardDescription>Summary of public events from the last 90 days.</CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default ActivityTimeline;