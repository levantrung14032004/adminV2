import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/sign-in";
import EcommerceProductsPage from "./pages/e-commerce/products";
import UserListPage from "./pages/users/list";
import OrderListPage from "./pages/orders/list";
import PermissionPage from "./pages/permissions/list";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/" element={<DashboardPage />} index />
          <Route
            path="/e-commerce/products"
            element={<EcommerceProductsPage />}
          />
          <Route path="/users/list" element={<UserListPage />} />
          <Route path="/orders/list" element={<OrderListPage />} />
          <Route path="/permissions/list" element={<PermissionPage />} />
        </Routes>
      </BrowserRouter>
    </Flowbite>
  </StrictMode>
);
