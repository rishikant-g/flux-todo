import { lazy } from "react";
import { SYSTEM_CONSTANTS } from "../../common/constants/constants";
const NotFoundPage = lazy(() => import("../../components/router/NotFound"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage"));
const TaskPage = lazy(() => import("../../pages/TaskPage"));

export const PUBLIC_ROUTES = [
  {
    path: "/",
    exact: true,
    component: LoginPage,
    title: "Login In | " + SYSTEM_CONSTANTS.APP_NAME,
  },
  {
    path: "/register",
    exact: true,
    component: RegisterPage,
    title: "Sign Up | " + SYSTEM_CONSTANTS.APP_NAME,
  },
  {
    path: "*",
    exact: true,
    component: NotFoundPage,
    title: "Page Not Found | " + SYSTEM_CONSTANTS.APP_NAME,
  },
];

export const PRIVATE_ROUTES = [
  {
    path: "/task",
    exact: true,
    component: TaskPage,
    title: "My Task | " + SYSTEM_CONSTANTS.APP_NAME,
  },
];
