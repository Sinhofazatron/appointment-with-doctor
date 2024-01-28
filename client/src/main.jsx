import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <App />
    <ToastContainer position="bottom-right" autoClose={3000} />
  </div>
);
