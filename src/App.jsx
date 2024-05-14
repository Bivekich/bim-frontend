import { useState } from 'react'
import './App.css'
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import UserPanel from "./components/UserPanel/UserPanel";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)

    const handleLogin = () => {
      setIsLoggedIn(true)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
    }

    const handleRegister = () => {
        setIsRegistering(false)
    }
    
  return (
      <div className="App">
          {isLoggedIn ? (
              <UserPanel onLogout={handleLogout}/>

          ) : (
              <>
                  {isRegistering ? (
                      <RegistrationForm onRegister={handleRegister}/>
                  ) : (
                      <LoginForm onLogin={handleLogin}/>
                  )}
                  <p>
                      У вас нет аккаунта?{' '}
                      <button onClick={() => setIsRegistering(true)}>Зарегистрироваться</button>
                  </p>
              </>
          )}
      </div>
  )
}

export default App
