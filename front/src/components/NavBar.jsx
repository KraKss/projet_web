import NavButton from "./NavButton.jsx";
import {ROUTES} from "../routes/routesPath.js";

const NavBar = () => {
    const currentTime = new Date().toLocaleTimeString();

    return (
        <div>
            <nav style={styles.nav}>
                <NavButton name="Home" route={ROUTES.HOME_ROUTE} />
                <NavButton name="Profile" route={ROUTES.PROFILE_ROUTE} />
                <NavButton name="Orders" route={ROUTES.ORDERS_ROUTE} />
                <NavButton name="Review" route={ROUTES.REVIEW_ROUTE} />
                <NavButton name="Products" route={ROUTES.PRODUCTS_ROUTE} />
                <div>{currentTime}</div> {/* Affiche l'heure au chargement */}
            </nav>
        </div>
    )
}

const styles = {
    nav: {
        display: "flex",
        backgroundColor: "#2f2f4f",
        padding: "0",
        height: "60px",
        width: "100%",
    },
}

export default NavBar;