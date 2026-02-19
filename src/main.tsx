import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

const CLERK_PUBLISHABLE_KEY = "pk_test_YW11c2VkLWhhbGlidXQtNDAuY2xlcmsuYWNjb3VudHMuZGV2JA";

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
