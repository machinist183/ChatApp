import axios from "axios";
import { API_BASE_URL } from "../config";
import { logout } from "../services/authService";
import { redirect } from "react-router-dom";

export default function axiosWithJwtInterceptor(){

  const jwtAxios = axios.create({});

  jwtAxios.interceptors.response.use(
    (response) => {
      console.log("I am inside the normal request")
      return response;
    },
    async (error) => {
      console.log(" I AM INSIDE ANY ERROR")
      const originalRequest = error.config;
      if (error.response.status == 401 || error.response.status == 403) {
        axios.defaults.withCredentials = true;
        console.log(" I am inside authentication errors")
        try {
          const response = await axios.post(
            `${API_BASE_URL}/token/refresh/`
          );
          if (response["status"] === 200 ) {
            return jwtAxios(originalRequest);
          }
        } catch (refreshError) {
          console.log("i am inside refresh erro")
          await logout()
          return Promise.reject(refreshError)
        }
      } else {
        console.log("I am inside any error other than refresh")
        return Promise.reject(error)
      }
      
    }
  );
  return jwtAxios;
}
export function redirectToLogin(refreshError){
  if (refreshError?.response?.code == 401 || refreshError?.response?.code == 403){
    throw redirect("/login/?message=Please login to access the given page")
  }
}