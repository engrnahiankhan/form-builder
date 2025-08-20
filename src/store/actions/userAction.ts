import { LoginCredentials, UpdateProfileData } from "@/config/type.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { setAuthInitialized } from "../slices/userSlice";
import app from "@/config/firebase.config";

// Initialize Firebase authentication
const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Async thunks for Firebase authentication operations
export const createNewUser = createAsyncThunk<
  UserCredential,
  LoginCredentials,
  { rejectValue: string }
>("user/createNewUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to create user");
  }
});

export const loginUser = createAsyncThunk<
  UserCredential,
  LoginCredentials,
  { rejectValue: string }
>("user/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to login");
  }
});

export const googleLogin = createAsyncThunk<
  UserCredential,
  void,
  { rejectValue: string }
>("user/googleLogin", async (_, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to login with Google");
  }
});

export const facebookLogin = createAsyncThunk<
  UserCredential,
  void,
  { rejectValue: string }
>("user/facebookLogin", async (_, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithPopup(auth, facebookProvider);
    return userCredential;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to login with Facebook");
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to logout");
    }
  }
);

export const updateUserProfile = createAsyncThunk<
  void,
  UpdateProfileData,
  { rejectValue: string }
>(
  "user/updateUserProfile",
  async ({ displayName, photoURL }, { rejectWithValue }) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        });
      } else {
        throw new Error("No authenticated user");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update profile");
    }
  }
);

// Authentication state listener thunk
export const initializeAuth = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("user/initializeAuth", async (_, { dispatch, rejectWithValue }) => {
  try {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        dispatch(setAuthInitialized());
        resolve(user);
      });

      // Store unsubscribe function for cleanup
      return unsubscribe;
    });
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to initialize auth");
  }
});
