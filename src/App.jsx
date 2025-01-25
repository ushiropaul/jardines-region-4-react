// App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/AuthForm/AuthForm';
import Register from './pages/RegisForm/RegisForm';
import GardensPage from "./pages/GardensPage/GardensPage";
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import MyAccount from './pages/MyAccount/MyAccount';
import MarketPlace from './pages/MarketPlace/MarketPlace';
import './App.css';

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <div className='main'>
        <Routes>
          <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path='/mi-cuenta'
              element={
                <ProtectedRoute>
                  <MyAccount/>
                </ProtectedRoute>
              }
            >

            </Route>
            <Route
              path='/gardens'
              element={
                <ProtectedRoute>
                  <GardensPage/>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path='/marketplace'
              element={
                <ProtectedRoute>
                  <MarketPlace/>
                </ProtectedRoute>
              }
            ></Route>
          <Route path="/auth" element={<Login />} />
          <Route path='/registrarse' element={<Register />}/> 
        </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
