import NavButton from "./NavButton.jsx";
import {ROUTES} from "../routes/routesPath.js";
import {useEffect, useState} from "react";

const NavBar = () => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);

            const diff = midnight - now;

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        };

        calculateTimeLeft();

        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <nav style={styles.nav}>
                <NavButton name="Home" route={ROUTES.HOME_ROUTE} />
                <NavButton name="Profile" route={ROUTES.PROFILE_ROUTE} />
                <NavButton name="Orders" route={ROUTES.ORDERS_ROUTE} />
                <NavButton name="Review" route={ROUTES.REVIEW_ROUTE} />
                <NavButton name="Products" route={ROUTES.PRODUCTS_ROUTE} />
                <NavButton name={timeLeft}/>
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