import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
interface User {
  email: string;
  password: string;
}

interface LoginPayload {
  usernameEmail: string;
  password: string;
}

interface SignupPayload {
  userEmail: string;
  password: string;
}

interface LoginState {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
  error: string | null;
}

// Initial state
const initialState: LoginState = {
  users: [
    { email: "demo@example.com", password: "password123" },
    { email: "test@user.com", password: "testpass" },
  ],
  currentUser: null,
  isLoggedIn: false,
  error: null,
};

// Create slice
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { usernameEmail, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === usernameEmail && u.password === password
      );

      if (user) {
        state.currentUser = user;
        state.isLoggedIn = true;
        state.error = null;
      } else {
        state.error = "Invalid credentials";
        state.isLoggedIn = false;
        state.currentUser = null;
      }
    },

    signup: (state, action: PayloadAction<SignupPayload>) => {
      const { userEmail, password } = action.payload;
      const existingUser = state.users.find((u) => u.email === userEmail);

      if (existingUser) {
        state.error = "User already exists";
      } else {
        const newUser = { email: userEmail, password };
        state.users.push(newUser);
        state.currentUser = newUser;
        state.isLoggedIn = true;
        state.error = null;
      }
    },

    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const { login, signup, logout, clearError } = loginSlice.actions;

// Export reducer
export default loginSlice.reducer;
