import { baseUrl } from "@/config/api.config";
import { FormDataType } from "@/config/type.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createFormAction = createAsyncThunk(
  "form/createForm",
  async (formData: FormDataType) => {
    const url = baseUrl + "/create-form";
    const res = await axios.post(url, formData);
    return res.data;
  }
);

export const getFormByIdAction = createAsyncThunk(
  "form/getFormById",
  async (id: string) => {
    const url = baseUrl + `/form/${id}`;
    const res = await axios.get(url);
    return res.data;
  }
);
