import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import UserContextProvider from "./context/userContext.jsx";
import store from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UserContextProvider>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </Provider>
);
