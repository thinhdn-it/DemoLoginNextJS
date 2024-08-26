import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, appleProvider } from '../src/firebaseConfig';
import { Button, Input, Typography, Form, message, Divider } from 'antd';
import { GoogleOutlined, FacebookOutlined, AppleOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log('User logged in:', currentUser);
      } else {
        setUser(null);
        console.log('No user is logged in');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      console.log('Google Login successful:', result.user);
      router.push('/');
    } catch (error) {
      message.error('Google Login Error: ' + error.message);
      console.error('Google Login Error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      setUser(result.user);
      console.log('Facebook Login successful:', result.user);
      router.push('/');
    } catch (error) {
      message.error('Facebook Login Error: ' + error.message);
      console.error('Facebook Login Error:', error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      setUser(result.user);
      console.log('Apple Login successful:', result.user);
      router.push('/');
    } catch (error) {
      message.error('Apple Login Error: ' + error.message);
      console.error('Apple Login Error:', error);
    }
  };

  const handleEmailPasswordAuth = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        message.success('User registered with Email/Password');
        console.log('User registered with Email/Password');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        message.success('User signed in with Email/Password');
        console.log('User signed in with Email/Password');
      }
      router.push('/');
    } catch (error) {
      message.error('Email/Password Auth Error: ' + error.message);
      console.error('Email/Password Auth Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success('User logged out');
      console.log('User logged out');
      setUser(null);
      router.push('/login');
    } catch (error) {
      message.error('Logout Error: ' + error.message);
      console.error('Logout Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        {isRegister ? 'Register' : 'Login'}
      </Title>
      {!user ? (
        <div>
          <Form onFinish={handleEmailPasswordAuth} layout="vertical">
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {isRegister ? 'Register' : 'Login'}
              </Button>
            </Form.Item>
          </Form>
          <Button type="link" onClick={() => setIsRegister(!isRegister)} block>
            Switch to {isRegister ? 'Login' : 'Register'}
          </Button>
          <Divider>Or</Divider>
          <div style={{ textAlign: 'center' }}>
            <Button
              type="default"
              icon={<GoogleOutlined />}
              onClick={handleGoogleLogin}
              style={{ marginBottom: '10px', width: '100%' }}
            >
              Login with Google
            </Button>
            <Button
              type="default"
              icon={<FacebookOutlined />}
              onClick={handleFacebookLogin}
              style={{ marginBottom: '10px', width: '100%' }}
            >
              Login with Facebook
            </Button>
            {/* <Button
              type="default"
              icon={<AppleOutlined />}
              onClick={handleAppleLogin}
              style={{ width: '100%' }}
            >
              Login with Apple
            </Button> */}
          </div>
        </div>
      ) : (
        <div>
          <Title level={3} style={{ textAlign: 'center' }}>
            Welcome, {user.displayName}!
          </Title>
          <Button type="primary" onClick={handleLogout} block>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
