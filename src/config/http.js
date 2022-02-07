import axios from "axios";

const urlDefault = process.env.REACT_APP_API;

const http = axios.create({
  baseURL: urlDefault,
});

http.defaults.headers["content-type"] = "application/json";

http.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      default:
        return Promise.reject(error);
    }
  }
);

export default http;
