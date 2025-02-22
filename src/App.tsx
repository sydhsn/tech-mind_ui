import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./page/Login";
import Layout from "./layout";
import Banner from "./components/Banner";
import PublishedCourses from "./page/PublishedCourses";
import Profile from "./page/Profile";
import Settings from "./page/Settings";
import AdminDashboard from "./page/AdminDashboard";
import StudentDashboard from "./page/StudentDashboard";
import TeacherDashboard from "./page/TeacherDashboard";
import { AuthProvider } from "./components/AuthProvider";
import { RoleProtectedRoute } from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Define routes using JSX
const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route
      index
      element={
        <>
          <Banner />
          <PublishedCourses />
        </>
      }
    />

    <Route
      path="profile"
      element={
        <RoleProtectedRoute allowedRoles={["student", "teacher", "admin"]}>
          <Profile />
        </RoleProtectedRoute>
      }
    />

    <Route
      path="settings"
      element={
        <RoleProtectedRoute allowedRoles={["student", "teacher", "admin"]}>
          <Settings />
        </RoleProtectedRoute>
      }
    />

    <Route
      path="student-dashboard"
      element={
        <RoleProtectedRoute allowedRoles={["student", "admin"]}>
          <StudentDashboard />
        </RoleProtectedRoute>
      }
    />

    <Route
      path="teacher-dashboard/*"
      element={
        <RoleProtectedRoute allowedRoles={["teacher", "admin"]}>
          <TeacherDashboard />
        </RoleProtectedRoute>
      }
    />

    <Route
      path="admin-dashboard"
      element={
        <RoleProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </RoleProtectedRoute>
      }
    />

    <Route path="login" element={<Login />} />
  </Route>
);

// Create the router
const appRouter = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
      {/* Toast Container */}
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
