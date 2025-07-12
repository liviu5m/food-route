import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Verify from "./components/pages/Verify";
import AuthRouteGuard from "./components/middleware/AuthRouteGuard";

function App() {
  return (
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
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
