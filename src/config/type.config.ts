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
};
