import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './app/Menu';
import Toolbar from './app/Toolbar';
import Welcome from './app/Welcome';
import { StateLoggedInRoute } from './common/components/LoggedInRoute';
import { Board } from './Game/Board';
import { Room } from './Game/Room';
import Login from './user/Login';
import Register from './user/Register';

function App() {
  return (
    <BrowserRouter>
      <table className="app_table">
        <thead>
          <tr className="app_toolbar">
            <td colSpan={2} >
              <Toolbar />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="app_menu">
              <Menu />
            </td>
            <td id="content" className="app_content">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/room" element={<StateLoggedInRoute component={Room} />} />
                <Route path="/tateti" element={<StateLoggedInRoute component={Board} />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet />
    </BrowserRouter >
  );
}

export default App;
