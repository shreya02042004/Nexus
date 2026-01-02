import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } />

            <Route path="/project/:id" element={
              <PrivateRoute>
                <Layout>
                  <ProjectDetails />
                </Layout>
              </PrivateRoute>
            } />

            <Route path="/calendar" element={
              <PrivateRoute>
                <Layout>
                  <Calendar />
                </Layout>
              </PrivateRoute>
            } />

            <Route path="/settings" element={
              <PrivateRoute>
                <Layout>
                  <Settings />
                </Layout>
              </PrivateRoute>
            } />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
