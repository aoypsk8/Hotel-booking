import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dashboard from "./screens/dashboard.jsx";
import NotFound from "./screens/error/notfound.jsx";
import LoginScreen from "./screens/auth/login_screen.jsx";
import Register from "./screens/auth/register_screen.jsx";
import Search from "./screens/search/search.jsx";
import CardDetail from "./screens/search/cardDetail.jsx";
import Profile from "./screens/search/profile.jsx";
import History from "./screens/search/history.jsx";
import PageHomeAdmin from "./screens/admin/PageHomeAdmin.jsx";
import CheckInAdmin from "./screens/admin/checkIn.jsx";
import CheckOutAdmin from "./screens/admin/checkOut.jsx";
import ManageRoomsAdmin from "./screens/admin/manage/rooms.jsx";
import ManageTypeAdmin from "./screens/admin/manage/type.jsx";
import ManageCustomersAdmin from "./screens/admin/manage/customer.jsx";
import ManageEmployeesAdmin from "./screens/admin/manage/employee.jsx";
import ManageUsersAdmin from "./screens/admin/manage/user.jsx";
import ManageEquimentsAdmin from "./screens/admin/manage/ຳequipment.jsx";
import CheckInNowAdmin from "./screens/admin/checkInNow.jsx";
import ReportCustomersAdmin from "./screens/admin/report/customer.jsx";
import ReportEmployeeAdmin from "./screens/admin/report/employee.jsx";
import ReportCheckInNowAdmin from "./screens/admin/report/checkInNow.jsx";
import ReportCheckInAdmin from "./screens/admin/report/checkIn.jsx";
import ReportCheckOutAdmin from "./screens/admin/report/checkOut.jsx";
import ReportEquipmentAdmin from "./screens/admin/report/ຳequipment.jsx";
import { getUserData } from "./api/authAction.jsx";
import 'primereact/resources/themes/saga-blue/theme.css';  // You can choose a different theme if you prefer
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null); // State to store data from PageHomeAdmin

  useEffect(() => {
    const user = getUserData();
    if (user) {
      setUserData(user);
    }
  }, [adminData]);
  const isAuthenticated = !!userData;
  const isAdmin = isAuthenticated && userData.type === 'admin'; // Only declared once
  // Callback function to handle data from PageHomeAdmin
  const handleAdminData = (data) => {
    setAdminData(data);
  };
  console.log(isAdmin);
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} /> {/* Publicly accessible */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginScreen />} />

        {/* Protected Routes */}
        <Route path="/search" element={<Search />} />
        <Route path="/cardDetail" element={<CardDetail />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
        <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/" />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<PageHomeAdmin onSendData={handleAdminData} />} />
        <Route path="/admin/checkIN" element={isAdmin ? <CheckInAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/return" element={isAdmin ? <CheckOutAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/CheckCus" element={isAdmin ? <CheckInNowAdmin /> : <Navigate to="/" />} />

        {/* Admin Management */}
        <Route path="/admin/manage/rooms" element={isAdmin ? <ManageRoomsAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/manage/customer" element={isAdmin ? <ManageCustomersAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/manage/employee" element={isAdmin ? <ManageEmployeesAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/manage/type" element={isAdmin ? <ManageTypeAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/manage/user" element={isAdmin ? <ManageUsersAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/manage/equipment" element={isAdmin ? <ManageEquimentsAdmin /> : <Navigate to="/" />} />

        {/* Admin Reports */}
        <Route path="/admin/report/customer" element={isAdmin ? <ReportCustomersAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/report/employee" element={isAdmin ? <ReportEmployeeAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/report/checkInNow" element={isAdmin ? <ReportCheckInNowAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/report/return" element={isAdmin ? <ReportCheckInAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/report/out" element={isAdmin ? <ReportCheckOutAdmin /> : <Navigate to="/" />} />
        <Route path="/admin/report/equipment" element={isAdmin ? <ReportEquipmentAdmin /> : <Navigate to="/" />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
