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
import AddCourse from "./page/TeacherDashboard/addCourse";
import Analytics from "./page/TeacherDashboard/Analytics";
import MyCourses from "./page/TeacherDashboard/MyCourses";
import SettingsPage from "./page/TeacherDashboard/Settings";
import Students from "./page/TeacherDashboard/Students";

import { EditCourseProvider } from "./Context/editCourseContext";
import PageNotFound from "./page/PageNotFound";
import CourseDetailsPage from "./page/CourseDetailsPage";

// Define routes using JSX
const routes = createRoutesFromElements(
  <>
    {/* Default route (Login page) */}
    <Route path="/" element={<Login />} />

    {/* Protected routes (Layout page and its children) */}
    <Route path="/home" element={<Layout />}>
      <Route
        index
        element={
          <RoleProtectedRoute allowedRoles={["student", "teacher", "admin"]}>
            <Banner />
            <PublishedCourses />
          </RoleProtectedRoute>
        }
      />

      {/* Relative paths for nested routes */}
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

      {/* <Route
        path="student-dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["student", "admin"]}>
            <Layout />
          </RoleProtectedRoute>
        }
      /> */}
      <Route
        path="student-dashboard/:courseId"
        element={
          <RoleProtectedRoute allowedRoles={["student", "admin"]}>
            <StudentDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="teacher-dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["teacher", "admin"]}>
            <EditCourseProvider>
              <TeacherDashboard />
            </EditCourseProvider>
          </RoleProtectedRoute>
        }
      >
        {/* Child Routes */}
        <Route index element={<MyCourses />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="students" element={<Students />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="add-course" element={<AddCourse />} />{" "}
        {/* Relative path */}
        <Route path="add-course/:courseId" element={<AddCourse />} />{" "}
        {/* Relative path */}
      </Route>

      {/* Catch-All Route (Optional) */}
      <Route path="*" element={<PageNotFound />} />

      <Route
        path="admin-dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/home/course-details/:courseId"
        element={<CourseDetailsPage />}
      />
    </Route>
  </>
);

// Create the router
const appRouter = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
