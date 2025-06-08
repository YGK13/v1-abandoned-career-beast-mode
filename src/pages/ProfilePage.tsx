import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserProfileCard from '../components/profile/UserProfileCard';

const ProfilePage: React.FC = () => {
  const { userEmail } = useAuth();

  return (
    <div>
      <h1>My Profile</h1>
      {userEmail ? (
        <UserProfileCard
          name="John Doe" // Mock data
          headline="Senior Software Engineer at Tech Corp" // Mock data
          summary="Experienced software engineer with a passion for developing innovative solutions. Skilled in React, Node.js, and cloud technologies." // Mock data
          contactEmail={userEmail}
        />
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
