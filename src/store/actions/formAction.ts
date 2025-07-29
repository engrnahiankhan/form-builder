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
  async (formData: FormType) => {
    const url = baseUrl + "/create";
    const res = await axios.post(url, formData);
    return res.data;
  }
);

export const getAllFormDataAction = createAsyncThunk(
  "form/getAllFormData",
  async () => {
    const url = baseUrl + "/all";
    const res = await axios.get(url);
    return res.data;
  }
);

export const getFormByIdAction = createAsyncThunk(
  "form/getFormDataById",
  async (id: string) => {
    const url = baseUrl + `/${id}`;
    const res = await axios.get(url);
    return res.data;
  }
);

export const updateFormAction = createAsyncThunk(
  "form/updateForm",
  async ({ id, formData }: { id: number; formData: Partial<FormType> }) => {
    const url = baseUrl + `/update/${id}`;
    const res = await axios.put(url, formData);
    return res.data;
  }
);

export const deleteFormAction = createAsyncThunk(
  "form/deleteForm",
  async (id: number) => {
    const url = baseUrl + `/delete/${id}`;
    const res = await axios.delete(url);
    return res.data;
  }
);
