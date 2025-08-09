import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileFormData {
  full_name: string;
  email: string;
  profile_picture?: File | null;
}

interface PasswordFormData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

interface ProfileState {
  profileForm: ProfileFormData;
  passwordForm: PasswordFormData;
  isProfileFormValid: boolean;
  isPasswordFormValid: boolean;
  profilePicturePreview: string | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ProfileState = {
  profileForm: {
    full_name: "",
    email: "",
    profile_picture: null,
  },
  passwordForm: {
    old_password: "",
    new_password: "",
    confirm_password: "",
  },
  isProfileFormValid: false,
  isPasswordFormValid: false,
  profilePicturePreview: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileFormData: (
      state,
      action: PayloadAction<Partial<ProfileFormData>>
    ) => {
      state.profileForm = { ...state.profileForm, ...action.payload };
    },
    setPasswordFormData: (
      state,
      action: PayloadAction<Partial<PasswordFormData>>
    ) => {
      state.passwordForm = { ...state.passwordForm, ...action.payload };
    },
    setProfileFormValid: (state, action: PayloadAction<boolean>) => {
      state.isProfileFormValid = action.payload;
    },
    setPasswordFormValid: (state, action: PayloadAction<boolean>) => {
      state.isPasswordFormValid = action.payload;
    },
    setProfilePicturePreview: (state, action: PayloadAction<string | null>) => {
      state.profilePicturePreview = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    },
    resetProfileForm: (state) => {
      state.profileForm = {
        full_name: "",
        email: "",
        profile_picture: null,
      };
      state.profilePicturePreview = null;
      state.isProfileFormValid = false;
    },
    resetPasswordForm: (state) => {
      state.passwordForm = {
        old_password: "",
        new_password: "",
        confirm_password: "",
      };
      state.isPasswordFormValid = false;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  setProfileFormData,
  setPasswordFormData,
  setProfileFormValid,
  setPasswordFormValid,
  setProfilePicturePreview,
  setLoading,
  setError,
  setSuccessMessage,
  resetProfileForm,
  resetPasswordForm,
  clearMessages,
} = profileSlice.actions;

export default profileSlice.reducer;
