import { baseUrl } from "@/config/api.config";
import { Question } from "@/config/type.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FormType {
  title: string;
  description?: string;
  questions?: Question[];
}

export const createFormAction = createAsyncThunk(
  "form/createForm",
  async ({ email, formData }: { email: string; formData: FormType }) => {
    const url = `${baseUrl}/create/${email}`;
    const res = await axios.post(url, formData);
    return res.data;
  }
);

// GET /form/v0/all/:email
export const getAllFormDataAction = createAsyncThunk(
  "form/getAllFormData",
  async (email: string) => {
    const url = baseUrl + `/all/${email}`;
    const res = await axios.get(url);
    return res.data;
  }
);

// GET /form/v0/:email/:id
export const getFormByIdAction = createAsyncThunk(
  "form/getFormDataById",
  async ({ email, id }: { email: string; id: number }) => {
    const url = baseUrl + `/${email}/${id}`;
    const res = await axios.get(url);
    return res.data;
  }
);

// PUT /form/v0/update/:email/:id
export const updateFormAction = createAsyncThunk(
  "form/updateForm",
  async ({
    email,
    id,
    formData,
  }: {
    email: string;
    id: number;
    formData: Partial<FormType>;
  }) => {
    const url = baseUrl + `/update/${email}/${id}`;
    const res = await axios.put(url, formData);
    return res.data;
  }
);

// DELETE /form/v0/delete/:email/:id
export const deleteFormAction = createAsyncThunk(
  "form/deleteForm",
  async ({ email, id }: { email: string; id: number }) => {
    const url = baseUrl + `/delete/${email}/${id}`;
    const res = await axios.delete(url);
    return { ...res.data, id };
  }
);
