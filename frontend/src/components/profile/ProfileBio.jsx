import React from 'react';
import { Briefcase, MapPin, Link as LinkIcon, Users } from 'lucide-react';

/**
 * Displays the user's core biographical information.
 * @param {object} props
 * @param {object} props.profile - The user's profile object from the GitHub API.
 */
const ProfileBio = ({ profile }) => {
  return (
    <div className="flex-1">
      {/* Name and Username */}
      <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
      <a 
        href={profile.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xl text-muted-foreground hover:text-primary transition-colors"
      >
        @{profile.login}
      </a>
      
      {/* Bio */}
      <p className="mt-4 text-foreground/90">{profile.bio}</p>
      
      {/* Metadata */}
      <div className="mt-4 flex flex-col space-y-2.5 text-muted-foreground">
        {profile.company && (
          <div className="flex items-center text-sm">
            <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{profile.company}</span>
          </div>
        )}
        {profile.location && (
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{profile.location}</span>
          </div>
        )}
        {profile.blog && (
          <div className="flex items-center text-sm">
            <LinkIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <a 
              href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors truncate"
            >
              {profile.blog}
            </a>
          </div>
        )}
        <div className="flex items-center text-sm">
          <Users className="h-4 w-4 mr-2 flex-shrink-0" />
          <span><b>{profile.followers}</b> followers · <b>{profile.following}</b> following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;