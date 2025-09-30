import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import HoverTooltip from '@/components/fun/HoverTooltip';
import { CalendarDays } from 'lucide-react';
import { format, subDays, getDay } from 'date-fns';

// Helper to get the color shade based on contribution count
const getColorForCount = (count) => {
  if (count === 0) return 'bg-secondary';
  if (count <= 3) return 'bg-emerald-900';
  if (count <= 7) return 'bg-emerald-800';
  if (count <= 15) return 'bg-emerald-700';
  return 'bg-emerald-600';
};

// Generates realistic sample contribution data for the last year.
const generateSampleContributionData = () => {
  const today = new Date();
  const data = [];
  for (let i = 0; i < 365; i++) {
    const date = subDays(today, i);
    const count = Math.random() > 0.3 ? Math.floor(Math.random() * 25) : 0;
    data.push({ date: format(date, 'yyyy-MM-dd'), count });
  }
  return data.reverse();
};

/**
 * Displays a GitHub-style contribution calendar.
 * NOTE: As GitHub provides no direct API for contribution data, this component uses
 * realistically generated sample data for demonstration purposes. A production
 * solution would require a server-side proxy to scrape this data.
 */
const ContributionCalendar = () => {
  const contributions = generateSampleContributionData();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Calculate the day of the week for the first day to align the grid correctly.
  const firstDay = getDay(new Date(contributions[0].date));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center"><CalendarDays className="h-6 w-6 mr-2" /> Contribution Calendar</CardTitle>
        <CardDescription>Illustrative data for the last year. See note in component code.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto p-4">
        <div className="inline-grid grid-rows-7 grid-flow-col gap-1">
          {/* Add empty cells to align the first day of the year to the correct weekday row */}
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="w-4 h-4" />)}
          
          {contributions.map(({ date, count }) => (
            <HoverTooltip key={date} text={`${count} contributions on ${date}`}>
              <div className={`w-4 h-4 rounded-sm ${getColorForCount(count)}`} />
            </HoverTooltip>
          ))}
        </div>
        <div className="flex justify-end items-center gap-2 mt-2 text-xs text-muted-foreground">
          Less
          <div className="w-4 h-4 rounded-sm bg-secondary" />
          <div className="w-4 h-4 rounded-sm bg-emerald-900" />
          <div className="w-4 h-4 rounded-sm bg-emerald-800" />
          <div className="w-4 h-4 rounded-sm bg-emerald-700" />
          <div className="w-4 h-4 rounded-sm bg-emerald-600" />
          More
        </div>
      </CardContent>
    </Card>
  );
};

// Dummy HoverTooltip for now, will be replaced with the real one.
// const HoverTooltip = ({ children }) => <div>{children}</div>;

export default ContributionCalendar;