import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../data/auth-context";

const AuthAxios = axios.create();

AuthAxios.interceptors.request.use(async (config) => {
  try {
    const token = AsyncStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token._z}`;
    config.baseURL = "http://192.168.166.58/api";
    return config;
  } catch (error) {
    console.log("error in auth axios interceptor", error);
  }
});
AuthAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error in axios response inceptor", error);
    return Promise.reject(error);
  }
);

export { AuthAxios };
