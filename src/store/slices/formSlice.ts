import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { createFormAction, getFormByIdAction } from "../actions/formAction";
import { FormDataType } from "@/config/type.config";

type FormAllDataType = {
  isLoading: boolean;
  isError: boolean;
  message: string;
  data: FormDataType[];
};

interface FormState {
  allFormData: FormAllDataType;
  formDataById: {
    isLoading: boolean;
    isError: boolean;
    message: string;
    data: FormDataType | null;
  };
  createForm: {
    isLoading: boolean;
    isError: boolean;
    message: string;
  };
}

const initialState: FormState = {
  allFormData: {
    isError: false,
    isLoading: false,
    message: "",
    data: [],
  },
  formDataById: {
    isError: false,
    isLoading: false,
    message: "",
    data: null,
  },
  createForm: {
    isError: false,
    isLoading: false,
    message: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Create a new blank form with unique ID
    createBlankForm: {
      reducer: (state, action: PayloadAction<{ id?: string }>) => {
        const newForm: FormDataType = {
          id: action.payload.id || uuidv4(),
          title: "Untitled Form",
          description: "",
        };
        state.allFormData.data.push(newForm);
      },
      prepare: (id?: string) => {
        return { payload: { id } };
      },
    },

    // Update form title by ID
    handleFormTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      if (
        state.formDataById.data &&
        state.formDataById.data.id === action.payload.id
      ) {
        state.formDataById.data.title = action.payload.title;
      }
    },

    // Update form description by ID
    handleFormDescription: (
      state,
      action: PayloadAction<{ id: string; description: string }>
    ) => {
      if (
        state.formDataById.data &&
        state.formDataById.data.id === action.payload.id
      ) {
        state.formDataById.data.description = action.payload.description;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create form
      .addCase(createFormAction.pending, (state) => {
        state.createForm.isLoading = true;
      })
      .addCase(createFormAction.fulfilled, (state, { payload }) => {
        state.createForm.isLoading = false;
        state.allFormData.data = payload;
      })
      .addCase(createFormAction.rejected, (state) => {
        state.createForm.isError = true;
      })

      // Get form data by id
      .addCase(getFormByIdAction.pending, (state) => {
        state.formDataById.isLoading = true;
      })
      .addCase(getFormByIdAction.fulfilled, (state, { payload }) => {
        state.formDataById.isLoading = false;
        state.formDataById.data = payload;
      })
      .addCase(getFormByIdAction.rejected, (state) => {
        state.formDataById.isError = true;
      });
  },
});

export const { createBlankForm, handleFormTitle, handleFormDescription } =
  formSlice.actions;

export default formSlice.reducer;
