import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NProgress from 'nprogress';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { firebaseApp } from '../../../firebase-config';

axios.defaults.baseURL = 'https://api.mindrecorder.io';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = null;
  },
};

// google sign in
const firebaseAuth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const googleSignIn = createAsyncThunk('google/signIn', async (_, thunkAPI) => {
  try {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    token.set(user.accessToken);
    return user.accessToken;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});

// google sign out

const googleSignOut = createAsyncThunk(
  'google/signOut',
  async (_, thunkAPI) => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// facebook sign in
const facebookProvider = new FacebookAuthProvider();

const facebookSignIn = createAsyncThunk(
  'facebook/signIn',
  async (_, thunkAPI) => {
    try {
      const { user } = await signInWithPopup(firebaseAuth, facebookProvider);
      // const { refreshToken, providerData } = user;
      // token.set(user.refreshToken);
      // return user.refreshToken;
      console.log(user);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// register

const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const data = await axios.post('/signup', credentials);
      token.set(data.token);
      // Notify.failure('Something went wrong. Please try again!', {
      //   borderRadius: '10px',
      //   backOverlay: true,
      // });
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// login

const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    // NProgress.start();
    const { data } = await axios.post('/login', credentials);
    token.set(data.data.token);
    return data.data;
  } catch (error) {
    Notify.failure('Something went wrong. Please try again!', {
      borderRadius: '10px',
      backOverlay: true,
    });
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

// logout

const logOut = createAsyncThunk('auth/logout', async (thunkAPI) => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const operations = {
  register,
  logIn,
  logOut,
  googleSignIn,
  googleSignOut,
  facebookSignIn,
};

export default operations;
