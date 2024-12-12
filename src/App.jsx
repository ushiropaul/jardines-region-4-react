// App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AuthForm from './pages/AuthForm/AuthForm';
import RegisForm from './pages/RegisForm/RegisForm';
import GardensPage from "./pages/GardensPage/GardensPage";
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <div className='main'>
      <AuthProvider>
        <Header />
        <Routes>

          {/* aca en un futuro va a estar el protectedroute */}
            <Route path="/" element={<Home />} />
            <Route path="/gardens" element={<GardensPage />} />
          {/* aca en un futuro va a estar el protectedroute */}

          <Route path="/auth" element={<AuthForm />} />
          <Route path='/registrarse' element={<RegisForm />}/> 
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
