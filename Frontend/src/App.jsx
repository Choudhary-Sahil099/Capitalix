import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Watchlist from "./pages/Watchlist/Watchlist";
import ProtectedRoute from "./components/layouts/ProtectedRoutes";
import Transactions from "./pages/Transactions/Transactions";
import News from "./pages/News/News";
import Explore from "./pages/Explore/Explore";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="news" element={<News />} />
        <Route path="explore" element={<Explore />} />

      </Route>
    </Routes>
  );
}

export default App;
