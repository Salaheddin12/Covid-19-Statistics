import axios from "axios";
import { toast } from "react-toastify";

//axios error interceptor
axios.interceptors.response.use(null, (error) => {
  const ExpectedError =
    error.response && error.response >= 400 && error.response < 500;
  if (!ExpectedError) {
    console.log("Logging the error " + error);
    toast.error("An unexpected error occurred");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
