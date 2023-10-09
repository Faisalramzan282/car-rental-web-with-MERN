import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserHome from './components/user/HomePage';
//Manager Route
import ManagerHome from './components/manager/HomePage';
import Users from './components/manager/User';
import Car from './components/manager/Car';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path='/login' element={ <Login/>} />
      <Route path='/' element={<UserHome/>} />
      <Route path='/home' element={<ManagerHome/>}>
      <Route path="users" element={<Users />} />
      <Route path='cars' element={<Car/>} />
      </Route>
      </Routes>
    </Router>
  );
}
export default App;
