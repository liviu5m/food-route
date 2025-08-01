import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Verify from "./components/pages/Verify";
import AuthRouteGuard from "./components/middleware/AuthRouteGuard";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import AdminRouteGuard from "./components/middleware/AdminRouteGuard";
import AuthRequiredRoute from "./components/middleware/AuthRequiredRoute";
import Account from "./components/pages/Account";
import { AppProvider } from "../libs/AppContext";
import CategoryAdmin from "./components/pages/admin/CategoryAdmin";
import ProductAdmin from "./components/pages/admin/ProductAdmin";
import Products from "./components/pages/Products";
import Product from "./components/pages/Product";
import Cart from "./components/pages/Cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FailedPayment from "./components/pages/FailedPayment";
import SuccessPayment from "./components/pages/SuccessPayment";
import SessionRequiredRoute from "./components/middleware/SessionRequiredRoute";
import Orders from "./components/pages/Orders";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <AppProvider>
        <div className="min-h-screen text-[#EEEEEE] overflow-x-hidden bg-[#222831]">
          <Routes>
            <Route
              path="/auth/*"
              element={
                <AuthRouteGuard>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verify" element={<Verify />} />
                  </Routes>
                </AuthRouteGuard>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminRouteGuard>
                  <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/category" element={<CategoryAdmin />} />
                    <Route path="/product" element={<ProductAdmin />} />
                  </Routes>
                </AdminRouteGuard>
              }
            />
            <Route
              path="/*"
              element={
                <AuthRequiredRoute>
                  <Routes>
                    <Route path="/account" element={<Account />} />
                  </Routes>
                </AuthRequiredRoute>
              }
            />
            <Route
              path="/session/*"
              element={
                <SessionRequiredRoute>
                  <Routes>
                    <Route path="/success" element={<SuccessPayment />} />
                    <Route path="/cancel" element={<FailedPayment />} />
                  </Routes>
                </SessionRequiredRoute>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </AppProvider>
    </Elements>
  );
}

export default App;
