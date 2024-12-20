import NavBar from "../components/NavBar.jsx";
import { useState } from "react";
import { useAuth } from "../provider/AuthProvider.jsx";

const Home = () => {
    const { user, logout, login } = useAuth();
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        const { username, password } = credentials;
        if (username && password) {
            await login({ username, password });
        }
    };

    if (!user) {
        return (
            <div>
                <h1>Page de Connexion</h1>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Nom d'utilisateur"
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                />
                <button onClick={handleLogin}>Se connecter</button>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <div>
                <p>Bienvenue dans le backoffice !</p>
                <button onClick={logout}>Se déconnecter</button>
            </div>
        </div>
    );
};

export default Home;
