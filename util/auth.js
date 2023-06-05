import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../data/http";

//------------------------------------------------
const token = AsyncStorage.getItem("token");

const auth = axios.create({
  baseURL: "http://192.168.133.58/api/otp",
});

//------------------------------------------------

export const login = async (mobile) => {
  const response = await auth.post(`/login`, { mobile: mobile });
  const userData = response.data.result;
  return userData;
};

export const confirm = async (userData) => {
  const response = await auth.post(`/confirm`, userData);
  const token = response.data.result.token;
  return token;
};

export const logout = async (token) => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token._z}`,
      "Content-Type": "application/json",
    },
  });
};
