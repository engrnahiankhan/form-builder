import { createSlice } from "@reduxjs/toolkit";
import {
  createFormAction,
  deleteFormAction,
  getAllFormDataAction,
  getFormByIdAction,
  updateFormAction,
} from "../actions/formAction";
import { InitialFormStateType } from "@/config/type.config";
import { v4 as uuidv4 } from "uuid";

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
  is_preview: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Set selected form data from list
    setSingleFormData: (state, { payload }) => {
      const foundForm = state.formsData.data.find(
        (form) => form.id === payload
      );
      if (foundForm) {
        state.singleFormData.data = {
          ...foundForm,
          is_preview: false,
        };
        state.singleFormData.message = "Single form set from list";
        state.singleFormData.isError = false;
      } else {
        state.singleFormData.data = null;
        state.singleFormData.message = "Form not found";
        state.singleFormData.isError = true;
      }
    },

    setPreviewMode: (state, { payload }) => {
      state.is_preview = payload;
    },

    // Update form title or description
    changeFormValueAction: (
      state,
      {
        payload,
      }: {
        payload: {
          id: number;
          title?: string;
          description?: string;
        };
      }
    ) => {
      const form = state.singleFormData.data;
      if (form && form.id === payload.id) {
        if (payload.title !== undefined) form.title = payload.title;
        if (payload.description !== undefined)
          form.description = payload.description;
      }
    },

    // Add blank question
    addBlankQuestion: (state) => {
      const newQuestion = {
        id: uuidv4(),
        text: "Untitled Question",
        required: false,
        options: [
          {
            id: uuidv4(),
            text: "Option 1",
            isCorrect: false,
          },
        ],
      };
      if (state.singleFormData.data?.questions) {
        state.singleFormData.data.questions.push(newQuestion);
      } else if (state.singleFormData.data) {
        state.singleFormData.data.questions = [newQuestion];
      }
    },

    // Add a blank option to a question
    addBlankOption: (
      state,
      {
        payload,
      }: {
        payload: {
          questionId: number | string;
        };
      }
    ) => {
      const question = state.singleFormData.data?.questions?.find(
        (q) => q.id === payload.questionId
      );
      if (question) {
        const optionNumber = question.options.length + 1;

        const newOption = {
          id: uuidv4(),
          text: `Option ${optionNumber}`,
          isCorrect: false,
        };
        question.options.push(newOption);
      }
    },

    // ✅ Update question text or required field (fully typed)
    changeQuestionValue: (
      state,
      {
        payload,
      }: {
        payload: {
          questionId: string | number;
          field: "text" | "required";
          value: string | boolean;
        };
      }
    ) => {
      const question = state.singleFormData.data?.questions?.find(
        (q) => q.id === payload.questionId
      );

      if (question) {
        if (payload.field === "text" && typeof payload.value === "string") {
          question.text = payload.value;
        } else if (
          payload.field === "required" &&
          typeof payload.value === "boolean"
        ) {
          question.required = payload.value;
        }
      }
    },

    // ✅ Update option text or isCorrect (fully typed)
    changeOptionValue: (
      state,
      {
        payload,
      }: {
        payload: {
          questionId: string | number;
          optionId: string | number;
          field: "text" | "isCorrect";
          value: string | boolean;
        };
      }
    ) => {
      const question = state.singleFormData.data?.questions?.find(
        (q) => q.id === payload.questionId
      );
      const option = question?.options.find(
        (opt) => opt.id === payload.optionId
      );

      if (option) {
        if (payload.field === "text" && typeof payload.value === "string") {
          option.text = payload.value;
        } else if (
          payload.field === "isCorrect" &&
          typeof payload.value === "boolean"
        ) {
          option.isCorrect = payload.value;
        }
      }
    },

    // Delete a question
    deleteQuestion: (
      state,
      {
        payload,
      }: {
        payload: {
          questionId: number | string;
        };
      }
    ) => {
      if (state.singleFormData.data?.questions) {
        state.singleFormData.data.questions =
          state.singleFormData.data.questions.filter(
            (q) => q.id !== payload.questionId
          );
      }
    },

    // Delete an option from a question
    deleteOption: (
      state,
      {
        payload,
      }: {
        payload: {
          questionId: number | string;
          optionId: number | string;
        };
      }
    ) => {
      const question = state.singleFormData.data?.questions?.find(
        (q) => q.id === payload.questionId
      );
      if (question?.options) {
        question.options = question.options.filter(
          (opt) => opt.id !== payload.optionId
        );
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

        state.singleFormData.data = {
          ...(payload.data || payload),
          is_preview: false,
        };
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

        const deletedId = action.payload.id;
        state.formsData.data = state.formsData.data.filter(
          (form) => form.id !== deletedId
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

export const {
  changeFormValueAction,
  setSingleFormData,
  addBlankQuestion,
  addBlankOption,
  changeQuestionValue,
  changeOptionValue,
  deleteOption,
  deleteQuestion,
  setPreviewMode,
} = formSlice.actions;
export default formSlice.reducer;
