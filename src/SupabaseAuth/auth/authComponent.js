// src/components/Auth.js
import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const AuthComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('event:', event);
        switch (event) {
          case 'SIGNED_IN':
            navigate('/dashboard');
            break;
          case 'SIGNED_OUT':
            console.log('User signed out');
            navigate('/');
            break;
          case 'USER_UPDATED':
            break;
          case 'PASSWORD_RECOVERY':
            console.log('Password recovery email sent');
            break;
          default:
            break;
        }
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <Auth
        supabaseClient={supabase}
        appearance={{
          style: {
            button: {
              backgroundColor: '#141263',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
              marginTop: '10px',
            },
            container: {
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            },
            input: {
              borderRadius: '4px',
              border: '1px solid #ccc',
              padding: '10px',
              margin: '5px 0',
            },
          },
        }}
        providers={['google', 'github']} // Add other providers if you wish
      />
    </div>
  );
};

export default AuthComponent;
