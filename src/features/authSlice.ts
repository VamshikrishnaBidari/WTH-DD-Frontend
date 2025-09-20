import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User, Teacher, Operator, DrivingSchool } from "../interfaces/models";
import api from "../utils/axiosInstance";

interface AuthState {
  status: boolean;
  user: User | Teacher | Operator | DrivingSchool | null;
  accessToken: string;
  role: "user" | "instructor" | "operator" | "school" | null;
}

type CurrentUserType = User | Teacher | Operator | DrivingSchool | null;

export const getCurrentUser = createAsyncThunk<CurrentUserType>(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users/current-user");

      if (response.data.success) {
        // console.log("Current user:", response.data.user);
        const userRole = response.data.user.role;
        console.log("User role:", userRole);
        return response.data.user;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  },
);

const initialState: AuthState = {
  status: false,
  user: null,
  accessToken: "",
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.status = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.status = false;
      state.user = null;
      state.accessToken = "";
      state.role = null;
    },
    refreshAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (
      state,
      action: PayloadAction<User | Teacher | Operator | DrivingSchool | null>,
    ) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = !!action.payload;

      const validRoles = ["user", "teacher", "operator", "school"] as const;
      const role = action.payload?.role;

      state.role = validRoles.includes(role as any)
        ? (role as AuthState["role"])
        : null;
    });
  },
});

export const { login, logout, refreshAccessToken, setUser } = authSlice.actions;

export default authSlice.reducer;
