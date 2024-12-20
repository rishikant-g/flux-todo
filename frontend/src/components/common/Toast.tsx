import { toast } from "react-toastify";

export const SUCCESS_TOAST = "success";
export const ERROR_TOAST = "error";
export const WARNING_TOAST = "warning";
export const INFO_TOAST = "info";

const Toast = (
  message: string,
  type: string,
  setting = {
    autoClose: 2500,
  },
) => {
  switch (type) {
    case "success":
      return toast.success(message, setting);
    case "info":
      return toast.info(message, setting);
    case "error":
      return toast.error(message, setting);
    case "warning":
      return toast.warning(message, setting);
    default:
      return toast.warning("Toast not defined", setting);
  }
};
export default Toast;
