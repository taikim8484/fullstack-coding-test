import { AUTH_ROUTES } from "@constants/router";
import axios from "axios";
import jwtDecoder from "jwt-decode";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 8000,
  validateStatus: (status) => status < 400,
});

const interceptorsRequest = (config) => {
  const { url } = config;
  if (AUTH_ROUTES.includes(url)) {
    return {
      ...config,
    };
  } else {
    const accessToken = localStorage.getItem("accessToken");
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: "Bearer " + accessToken,
      },
    };
  }
};
const interceptorsResponseSuccess = (response) => {
  const request = response.config;
  const { url } = request;

  const { data } = response;
  let extendResponseData = {};

  if (["/auth/sign-in"].includes(url)) {
    const { accessToken } = data;
    localStorage.setItem("accessToken", accessToken);
    const user: Object = jwtDecoder(accessToken);
    extendResponseData = { ...extendResponseData, user };
  }
  if (["/auth/sign-out"].includes(url)) {
    localStorage.removeItem("accessToken");
  }

  return {
    ...response,
    data: {
      ...data,
      ...extendResponseData,
    },
  };
};

axiosInstance.interceptors.request.use(interceptorsRequest);
axiosInstance.interceptors.response.use(interceptorsResponseSuccess);

const Api = ({ url, method, data = {}, params = {} }) => {
  return axiosInstance.request({
    method,
    url,
    data,
    params,
  });
};

export default Api;
