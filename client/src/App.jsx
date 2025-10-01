import Homepage from "./pages/Homepage";
import MainLayout from "./Layouts/MainLayout";
import JobsPage from "./pages/EventsPage";
import PageNotFound from "./pages/PageNotFound";
import JobPage from "./pages/EventPage";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoutes";

import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/events" element={<JobsPage />} />
        

       <Route element={<ProtectedRoute requiredRole="user" />}>
        <Route path='/my-bookings' element={<MyBookings />} />
       </Route>

        {/* admin access only */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/add-event" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />  
          <Route path="/event/:id" element={<JobPage />} />
        </Route>

        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
