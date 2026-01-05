import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { userAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Sync user to MongoDB
const syncUserToMongoDB = async (firebaseUser, role = 'user') => {
  try {
    const userData = {
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || firebaseUser.email,
      photoURL: firebaseUser.photoURL || null,
      role: role,
      provider: firebaseUser.providerData[0]?.providerId || 'email',
      lastLogin: new Date()
    };

    await userAPI.create(userData);
  } catch (error) {
    console.error('Failed to sync user to MongoDB:', error);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Determine if user is admin based on email
        const isAdmin = firebaseUser.email === 'fitnesshubadmin@gmail.com';
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          isAdmin: isAdmin
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email & Password Login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Sync login to MongoDB
      await syncUserToMongoDB(userCredential.user, 'user');
      
      // Redirect to admin panel if admin email, otherwise home
      const isAdmin = userCredential.user.email === 'fitnesshubadmin@gmail.com';
      return { 
        success: true, 
        redirect: isAdmin ? '/admin' : '/' 
      };
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
      }
      return { success: false, error: errorMessage };
    }
  };

  // Google Login
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Sync to MongoDB
      await syncUserToMongoDB(result.user, 'user');
      
      return { success: true, redirect: '/' };
    } catch (error) {
      let errorMessage = 'Failed to login with Google';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login popup was closed';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Login cancelled';
      }
      return { success: false, error: errorMessage };
    }
  };

  // Email & Password Registration
  const register = async (userData) => {
    try {
      const { email, password, name, role } = userData;
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Sync to MongoDB (always as 'user' role)
      await syncUserToMongoDB(userCredential.user, role || 'user');

      return { success: true };
    } catch (error) {
      let errorMessage = 'Failed to register';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      }
      return { success: false, error: errorMessage };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    auth: user, // Keep 'auth' for backward compatibility
    user,
    login,
    loginWithGoogle,
    logout,
    register,
    loading
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
