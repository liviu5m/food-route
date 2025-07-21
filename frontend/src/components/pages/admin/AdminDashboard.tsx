import React from "react";
import Sidebar from "../../elements/admin/Sidebar";
import AdminLayout from "../../layouts/AdminLayout";
import { useAppContext } from "../../../../libs/AppContext";

const AdminDashboard = () => {
  const { user } = useAppContext();

  return (
    <AdminLayout>
      <h1>Welcome, {user?.fullName}</h1>
    </AdminLayout>
  );
};

export default AdminDashboard;
