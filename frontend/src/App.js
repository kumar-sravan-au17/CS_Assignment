import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';

function App() {
  return (
    <div className="App">
      <h1 className="text-center mb-3">Survey App</h1>
      <div>
        <BrowserRouter >
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/admin" element={<AdminPage />}/>
          <Route path="/user" element={<UserPage />}/>
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
