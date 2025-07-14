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

function App() {
  return (
    <AppProvider>
      <div className="bg-[#222831] min-h-screen text-[#EEEEEE]">
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
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
