import { createSlice } from "@reduxjs/toolkit";
import {
  createFormAction,
  deleteFormAction,
  getAllFormDataAction,
  getFormByIdAction,
  updateFormAction,
} from "../actions/formAction";
import { InitialFormStateType } from "@/config/type.config";

const initialState: InitialFormStateType = {
  formsData: {
    isError: false,
    isLoading: false,
    message: "",
    newId: null,
    data: [],
  },
  singleFormData: {
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
    setSingleFormData: (state, { payload }) => {
      const foundForm = state.formsData.data.find(
        (form) => form.id === payload
      );
      if (foundForm) {
        state.singleFormData.data = foundForm;
        state.singleFormData.message = "Single form set from list";
        state.singleFormData.isError = false;
      } else {
        state.singleFormData.data = null;
        state.singleFormData.message = "Form not found";
        state.singleFormData.isError = true;
      }
    },

    changeFormValueAction: (state, { payload }) => {
      const form = state.singleFormData.data;
      if (form && form.id === payload.id) {
        if (payload.title !== undefined) form.title = payload.title;
        if (payload.description !== undefined)
          form.description = payload.description;
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
      .addCase(createFormAction.fulfilled, (state, { payload }) => {
        console.log("check create payload:", payload);

        state.createForm.isLoading = false;
        state.createForm.isError = false;
        state.createForm.message = "Form created successfully";

        state.formsData.newId = payload.data.id;

        if (Array.isArray(state.formsData.data)) {
          state.formsData.data.unshift(payload.data);
        } else {
          state.formsData.data = [payload.data];
        }
      })
      .addCase(createFormAction.rejected, (state, action) => {
        state.createForm.isLoading = false;
        state.createForm.isError = true;
        state.createForm.message =
          action.error.message || "Failed to create form";
      })

      // Get All form data
      .addCase(getAllFormDataAction.pending, (state) => {
        state.formsData.isLoading = true;
        state.formsData.message = "";
      })
      .addCase(getAllFormDataAction.fulfilled, (state, { payload }) => {
        state.formsData.isLoading = false;
        state.formsData.isError = false;
        state.formsData.message = "Forms fetched successfully";

        state.formsData.data = payload.data;
      })
      .addCase(getAllFormDataAction.rejected, (state, action) => {
        state.formsData.isLoading = false;
        state.formsData.isError = true;
        state.formsData.message =
          action.error.message || "Failed to fetch forms";
      })

      // Get form data by id
      .addCase(getFormByIdAction.pending, (state) => {
        state.singleFormData.isLoading = true;
        state.singleFormData.message = "";
      })
      .addCase(getFormByIdAction.fulfilled, (state, { payload }) => {
        state.singleFormData.isLoading = false;
        state.singleFormData.isError = false;
        state.singleFormData.message = "Form fetched successfully";

        state.singleFormData.data = payload;
      })
      .addCase(getFormByIdAction.rejected, (state, action) => {
        state.singleFormData.isLoading = false;
        state.singleFormData.isError = true;
        state.singleFormData.message =
          action.error.message || "Failed to fetch form";
      })

      // Update form
      .addCase(updateFormAction.pending, (state) => {
        state.updateForm.isLoading = true;
        state.updateForm.message = "";
      })
      .addCase(updateFormAction.fulfilled, (state) => {
        state.updateForm.isLoading = false;
        state.updateForm.isError = false;
        state.updateForm.message = "Form updated successfully";
      })
      .addCase(updateFormAction.rejected, (state, action) => {
        console.log("update log:", action);

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
        state.deleteForm.isError = false;
        state.deleteForm.message = "Form deleted successfully";

        const pathId = action.meta.arg;
        state.formsData.data = state.formsData.data.filter(
          (form) => form.id !== Number(pathId)
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

export const { changeFormValueAction, setSingleFormData } = formSlice.actions;
export default formSlice.reducer;
