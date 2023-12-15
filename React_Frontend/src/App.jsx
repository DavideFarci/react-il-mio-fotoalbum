import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './pages/DefaultLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
