import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../src/firebaseConfig';
import { useRouter } from 'next/router';
import { Card, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 300 }}>
        {user ? (
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              size={64} 
              icon={<UserOutlined />} 
              src={user.photoURL} 
              alt={user.displayName} 
              style={{ marginBottom: 16 }} 
            />
            <h2>Welcome, {user.displayName}!</h2>
            <p>Email: {user.email}</p>
            <Button 
              type="primary" 
              icon={<LogoutOutlined />} 
              onClick={handleLogout} 
              style={{ marginTop: 16 }}>
              Logout
            </Button>
          </div>
        ) : (
          <p>Please login to continue.</p>
        )}
      </Card>
    </div>
  );
}
