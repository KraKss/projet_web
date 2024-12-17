import {Link} from "react-router-dom";

const NavButton = (props) => {
    return (
        <Link to={props.route} style={style.link}>
            <button style={style.btn}>{props.name} </button>
        </Link>
    )
}

const style = {
    btn: {
        color: "#ffffff",
        backgroundColor: "#2f2f4f",
        border: "none",
        padding: "0 15px",
        fontSize: "1rem",
        cursor: "pointer",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    link: {
        textDecoration: "none",
    }
}

export default NavButton;