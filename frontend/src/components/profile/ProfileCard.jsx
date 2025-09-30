import React from 'react';
import ProfileAvatar from './ProfileAvatar';
import ProfileBio from './ProfileBio';
import ProfileStats from './ProfileStats';
import { Card, CardContent } from '@/components/ui/card';

/**
 * The main container component for the profile section.
 * It composes the Avatar, Bio, and Stats components into a single card.
 * @param {object} props
 * @param {object} props.profile - The user's profile object from the GitHub API.
 * @param {Array<object>} props.stats - The calculated user statistics.
 */
const ProfileCard = ({ profile, stats }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <ProfileAvatar avatarUrl={profile.avatar_url} username={profile.login} />
          <ProfileBio profile={profile} />
        </div>
        <ProfileStats stats={stats} />
      </CardContent>
    </Card>
  );
};

export default ProfileCard;