import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Brainstorm from './pages/Brainstorm';
import Tasks from './pages/Tasks';
import Documents from './pages/Documents';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a0f' }}>
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard */}
            <Route path="/" element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } />

            {/* Projects */}
            <Route path="/projects" element={
              <PrivateRoute>
                <Layout>
                  <Projects />
                </Layout>
              </PrivateRoute>
            } />

            {/* Project Details */}
            <Route path="/project/:id" element={
              <PrivateRoute>
                <Layout>
                  <ProjectDetails />
                </Layout>
              </PrivateRoute>
            } />

            {/* Brainstorming Board - Full Screen */}
            <Route path="/project/:id/brainstorm" element={
              <PrivateRoute>
                <Brainstorm />
              </PrivateRoute>
            } />

            {/* Tasks */}
            <Route path="/tasks" element={
              <PrivateRoute>
                <Layout>
                  <Tasks />
                </Layout>
              </PrivateRoute>
            } />

            {/* Documents */}
            <Route path="/documents" element={
              <PrivateRoute>
                <Layout>
                  <Documents />
                </Layout>
              </PrivateRoute>
            } />

            {/* Calendar */}
            <Route path="/calendar" element={
              <PrivateRoute>
                <Layout>
                  <Calendar />
                </Layout>
              </PrivateRoute>
            } />

            {/* Settings */}
            <Route path="/settings" element={
              <PrivateRoute>
                <Layout>
                  <Settings />
                </Layout>
              </PrivateRoute>
            } />

            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
