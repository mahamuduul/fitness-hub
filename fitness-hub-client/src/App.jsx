import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Gym from './pages/Gym';
import Medical from './pages/Medical';
import Nutrition from './pages/Nutrition';
import Mind from './pages/Mind';
import Diet from './pages/Diet';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gym" element={<Gym />} />
                <Route path="/medical" element={<Medical />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/mind" element={<Mind />} />
                <Route path="/diet" element={<Diet />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
