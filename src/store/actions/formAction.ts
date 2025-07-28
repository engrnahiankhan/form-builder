import { baseUrl } from "@/config/api.config";
import { FormDataType } from "@/config/type.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createFormAction = createAsyncThunk(
  "form/createForm",
  async (formData: FormDataType) => {
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
  async ({ id, formData }: { id: string; formData: Partial<FormDataType> }) => {
    const url = baseUrl + `/update/${id}`;
    const res = await axios.put(url, formData);
    return res.data;
  }
);

export const deleteFormAction = createAsyncThunk(
  "form/deleteForm",
  async (id: string) => {
    const url = baseUrl + `/delete/${id}`;
    const res = await axios.delete(url);
    return res.data;
  }
);
