import {useState} from "react";
import {login} from '../../api/api'
import './LoginForm.css'

function LoginForm({onLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password)
            onLogin()
        } catch (error) {
            setError(error)
        }
    }
    return (
        <div className='login-form-container'>
            <h1>Авторизация</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Пароль:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">Войти</button>
            </form>
        </div>
    )
}

export default LoginForm