import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, userEmail, signOut } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            CareerBeast
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/documents">Documents</Link></li>
            <li><Link to="/coach">AI Coach</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/business">Business</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li> {/* Add Settings link */}
            <li style={{ marginLeft: 'auto' }}><span>{userEmail}</span></li> {/* Pushes to the right if nav is flex */}
            <li><button onClick={signOut}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li style={{ marginLeft: 'auto' }}><Link to="/auth">Sign In / Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
