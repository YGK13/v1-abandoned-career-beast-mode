import React, { useState } from 'react';
import SignUpForm from '../components/auth/SignUpForm';
import SignInForm from '../components/auth/SignInForm';

const AuthPage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div>
      {showSignIn ? <SignInForm /> : <SignUpForm />}
      <button onClick={() => setShowSignIn(!showSignIn)}>
        {showSignIn ? 'Need to create an account?' : 'Already have an account?'}
      </button>
    </div>
  );
};

export default AuthPage;
