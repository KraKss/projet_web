import NavBar from "../components/NavBar.jsx";
import {useAuth} from "../provider/AuthProvider.jsx";

const Home = () => {
    const { user, logout, login } = useAuth();
    const handleLogin = () => {
        login({ name: 'John Doe', email: 'john.doe@example.com' });
    };

    if (!user) {
        return (
            <div>
                <h1>Page de Connexion</h1>
                <button onClick={handleLogin}>Se connecter</button>
            </div>
        );
    }

    return (
        <div>
            <NavBar/>
            <div>
                <p>Bienvenue dans le backoffice !</p>
                <button onClick={logout}>Se déconnecter</button>
            </div>
        </div>
    );
};

export default Home;
