export const SYSTEM_CONSTANTS = {
  BASE_URL: import.meta.env.VITE_REACT_APP_API_URL,
  BASE_ENVIRONMENT: import.meta.env.VITE_REACT_APP_ENV,
  APP_NAME: import.meta.env.VITE_REACT_APP_NAME,
};

export const CONSTANTS = {
  ONLY_BLANK_SPACES_NOT_ALLOWED_REGEX: new RegExp(/^\S(.*\S)?$/), // not allow to only space atleas 1 character is needed
  EMAIL_REGEX: new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ),
  PASSWORD_VALIDATION_REGEX: new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,50}$/,
  ), // Password must have one uppercase , one lowercase and one special character
};
