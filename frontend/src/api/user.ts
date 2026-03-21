import axios from "axios";
import type { LoginData, SignupData } from "../../libs/Types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function loginUserFunc(data: LoginData) {
  const response = await axios.post(`${baseUrl}/auth/login`, data, {
    withCredentials: true,
  });
  return response.data;
}

export async function signupUserFunc(data: SignupData) {
  const response = await axios.post(`${baseUrl}/auth/signup`, data);
  return response.data;
}

export async function verifyUserFunc(verificationCode: string, email: string) {
  const response = await axios.post(`${baseUrl}/auth/verify`, {
    verificationCode,
    email,
  });
  return response.data;
}

export async function resendVerificationCodeFunc(email: string) {
  const response = await axios.post(`${baseUrl}/auth/resend?email=${email}`);
  return response.data;
}

export async function getUserFunc() {
  const response = await axios.get(`${baseUrl}/auth/jwt`, {
    withCredentials: true,
  });
  return response.data;
}

export async function logoutUserFunc() {
  const response = await axios.post(
    `${baseUrl}/auth/logout`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export async function updateUserAccountData(id: number, data: any) {
  const response = await axios.put(
    `${baseUrl}/api/users/${id}`,
    { ...data },
    {
      withCredentials: true,
    },
  );
  return response.data;
}
