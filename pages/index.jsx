import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, message } from 'antd';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../src/firebaseConfig';

export default function Index() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navigateToProfile = () => {
    if (user) {
      router.push('/userprofile');
    } else {
      router.push('/login'); 
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error);
      message.error('Logout failed. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to the Home Page</h1>
        {user ? (
          <div>
            <h2>Hello, {user.displayName || 'User'}!</h2>
            <Button 
              type="primary" 
              onClick={navigateToProfile}
              style={{ marginBottom: 16 }}
            >
              Go to User Profile
            </Button>
            <Button 
              type="default" 
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <Button 
            type="primary" 
            onClick={navigateToProfile}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
