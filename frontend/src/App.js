import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import { createContext, useState } from 'react'

export const UserContext = createContext()


function App() {

  const [loggedIn , setLoggedIn] = useState(localStorage.getItem('loggedIn') || false)
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '')
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '')
  const [role, setRole] = useState(localStorage.getItem('role') || '')

  let obj = {
    loggedIn,
    userId,
    userName,
    role,
    setLoggedIn,
    setUserId,
    setUserName,
    setRole
  }

  return (
    <UserContext.Provider value={obj}>
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
    </UserContext.Provider>
  );
}

export default App;
