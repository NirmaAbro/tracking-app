import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssBaseline />{" "}
    {/*  es sa jo by default css apply hogi vo remove hojaygi ,  */}
    <App />
  </StrictMode>
);
