import { toast } from "react-toastify";
import { AxiosError } from "axios";

export type ErrorResponse = {
  message?: string;
  error?: string | Record<string, string[]>;
  errors?: { message: string };
  common?: string;
};

const showErrorToast = (
  error: AxiosError<ErrorResponse> | string | null | any
) => {
  if (error && typeof error !== "string") {
    const errorData = error.response?.data;

    if (error.message) {
      toast.error(error.message);
    } else if (errorData?.message) {
      toast.error(errorData.message);
    } else if (errorData?.error) {
      const errorObj = errorData.error;
      if (typeof errorObj === "string") {
        toast.error(errorObj);
      } else {
        for (const key in errorObj) {
          if (Array.isArray(errorObj[key])) {
            toast.error(errorObj[key].join(","));
          } else {
            toast.error(errorObj[key]);
          }
        }
      }
    } else if (errorData?.errors?.message) {
      toast.error(errorData.errors.message);
    } else if (errorData?.common) {
      toast.error(errorData.common);
    } else {
      toast.error("Oops! Something went wrong. Please try again.");
    }
  } else if (typeof error === "string") {
    toast.error(error);
  } else {
    toast.error("Oops! Something went wrong. Please try again.");
  }
};

export default showErrorToast;
