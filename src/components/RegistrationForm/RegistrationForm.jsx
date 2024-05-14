import {useState} from "react";
import {register} from "../../api/api";
import './RegistrationForm.css'

function RegistrationForm({onRegister}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password)
            onRegister(email, password);
            setEmail('')
            setPassword('')
        } catch (error) {
            setError(error)
        }

    }

    return (
        <div className="registration-form-container">
            <h1>Регистрация</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Email:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    )
}

export default RegistrationForm;