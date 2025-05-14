
import { BrowserRouter,Routes,Route , useNavigate ,Navigate} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import DestinationsPage from './pages/DestinationsPage'
import HotelsPage from './pages/HotelsPage'
import HotelPage from './pages/HotelPage'
import AboutUs from './pages/AboutUs'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import LogoutOnClose from './pages/LogoutOnClose'
import PrivateRoute from './security/PrivateRoute';

const App = () => {



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/destinations" element={<PrivateRoute> <DestinationsPage/> </PrivateRoute>} />
          <Route path="/hotelspage/:name"element={<PrivateRoute> <HotelsPage/> </PrivateRoute>} />
          <Route path="/hotel/:location/:hotel" element={<PrivateRoute> <HotelPage/> </PrivateRoute>} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admin" element={<PrivateRoute> <AdminPage/> </PrivateRoute>}  />
        </Routes>
      </BrowserRouter>
      <LogoutOnClose />
    </div>
  );
};



export default App;
