import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, appleProvider } from '../src/firebaseConfig';

export default function Login() {
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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      router.push('/'); 
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      setUser(result.user);
      router.push('/');
    } catch (error) {
      console.error('Facebook Login Error:', error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      setUser(result.user);
      router.push('/');
    } catch (error) {
      console.error('Apple Login Error:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      {/* <button onClick={handleFacebookLogin}>Login with Facebook</button>
      <button onClick={handleAppleLogin}>Login with Apple</button> */}

      {user && (
        <div>
          <h2>Welcome, {user.displayName}!</h2>
        </div>
      )}
    </div>
  );
}
