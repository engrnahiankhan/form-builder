import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  createFormAction,
  deleteFormAction,
  getAllFormDataAction,
  getFormByIdAction,
  updateFormAction,
} from "../actions/formAction";
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
  updateForm: {
    isLoading: boolean;
    isError: boolean;
    message: string;
  };
  deleteForm: {
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
  updateForm: {
    isError: false,
    isLoading: false,
    message: "",
  },
  deleteForm: {
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
        state.createForm.message = "";
      })
      .addCase(createFormAction.fulfilled, (state) => {
        state.createForm.isLoading = false;
        state.createForm.message = "Form created successfully";
        // state.allFormData.data = payload;
      })
      .addCase(createFormAction.rejected, (state, action) => {
        state.createForm.isLoading = false;
        state.createForm.isError = true;
        state.createForm.message =
          action.error.message || "Failed to create form";
      })

      // Get All form data
      .addCase(getAllFormDataAction.pending, (state) => {
        state.allFormData.isLoading = true;
        state.allFormData.message = "";
      })
      .addCase(getAllFormDataAction.fulfilled, (state, { payload }) => {
        state.allFormData.isLoading = false;
        state.allFormData.message = "Forms fetched successfully";
        state.allFormData.data = payload;
      })
      .addCase(getAllFormDataAction.rejected, (state, action) => {
        state.allFormData.isLoading = false;
        state.allFormData.isError = true;
        state.allFormData.message =
          action.error.message || "Failed to fetch forms";
      })

      // Get form data by id
      .addCase(getFormByIdAction.pending, (state) => {
        state.formDataById.isLoading = true;
        state.formDataById.message = "";
      })
      .addCase(getFormByIdAction.fulfilled, (state, { payload }) => {
        state.formDataById.isLoading = false;
        state.formDataById.message = "Form fetched successfully";
        state.formDataById.data = payload;
      })
      .addCase(getFormByIdAction.rejected, (state, action) => {
        state.formDataById.isLoading = false;
        state.formDataById.isError = true;
        state.formDataById.message =
          action.error.message || "Failed to fetch form";
      })

      // Update form
      .addCase(updateFormAction.pending, (state) => {
        state.updateForm.isLoading = true;
        state.updateForm.message = "";
      })
      .addCase(updateFormAction.fulfilled, (state) => {
        state.updateForm.isLoading = false;
        state.updateForm.message = "Form updated successfully";
      })
      .addCase(updateFormAction.rejected, (state, action) => {
        state.updateForm.isLoading = false;
        state.updateForm.isError = true;
        state.updateForm.message =
          action.error.message || "Failed to update form";
      })

      // Delete single Form by id
      .addCase(deleteFormAction.pending, (state) => {
        state.deleteForm.isLoading = true;
        state.deleteForm.message = "";
      })
      .addCase(deleteFormAction.fulfilled, (state, action) => {
        state.deleteForm.isLoading = false;
        state.deleteForm.message = "Form deleted successfully";
        const pathId = action.meta.arg;
        state.allFormData.data = state.allFormData.data.filter(
          (form) => form.id !== pathId
        );
      })
      .addCase(deleteFormAction.rejected, (state, action) => {
        state.deleteForm.isLoading = false;
        state.deleteForm.isError = true;
        state.deleteForm.message =
          action.error.message || "Failed to delete form";
      });
  },
});

export const { createBlankForm, handleFormTitle, handleFormDescription } =
  formSlice.actions;

export default formSlice.reducer;
