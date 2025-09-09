import { User } from "firebase/auth";

// COMMON TYPE
export interface CommonStateType {
  isLoading: boolean;
  isError: boolean;
  message: string;
}

export interface Option {
  id: number | string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number | string;
  text: string;
  required: boolean;
  options: Option[];
}

export interface FormDataType {
  id: number;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  questions?: Question[];
  is_preview: boolean;
}

export type AllFormDataType = CommonStateType & {
  newId: number | null;
  data: FormDataType[];
};

export type FormDataById = CommonStateType & {
  data: FormDataType | null;
};

export type InitialFormStateType = {
  formsData: AllFormDataType;
  singleFormData: FormDataById;
  createForm: CommonStateType;
  updateForm: CommonStateType;
  deleteForm: CommonStateType;
  is_preview: boolean;
};

// User Types
export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  authInitialized: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  displayName: string;
  photoURL: string;
}
