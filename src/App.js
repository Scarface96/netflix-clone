import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DetailsModal from './components/DetailsModal';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import { ListContextProvider } from './context/ListContext';
import { DetailsProvider } from './context/DetailsContext';
import Home from './pages/Home';
import Search from './pages/Search';
import MyList from './pages/MyList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

function App() {
  return (
    <AuthContextProvider>
      <ListContextProvider>
        <DetailsProvider>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/my-list' element={<MyList />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route
              path='/account'
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          <Footer />
          <DetailsModal />
        </DetailsProvider>
      </ListContextProvider>
    </AuthContextProvider>
  );
}

export default App;
