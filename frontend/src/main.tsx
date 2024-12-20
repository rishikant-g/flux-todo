import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/router/Fallback";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./common/services/queryClient.ts";
import { AuthProvider } from "./provider/authProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary FallbackComponent={Fallback}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
