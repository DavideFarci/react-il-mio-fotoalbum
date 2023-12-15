import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './pages/DefaultLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import GuestRoutes from './middlewares/GuestRoutes';
import PrivateRoutes from './middlewares/PrivateRoutes';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rotte Pubbliche  */}
            <Route
              element={
                <GuestRoutes>
                  <DefaultLayout />
                </GuestRoutes>
              }
            >
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>

            {/* Rotte Private  */}
            <Route
              element={
                <PrivateRoutes>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
