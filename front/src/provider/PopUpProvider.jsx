import  { createContext, useState, useContext } from "react";
import Popup from "../components/Popup.jsx";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState(null);

    const showPopup = (content) => {
        setContent(content);
        setIsVisible(true);
    };

    const hidePopup = () => {
        setIsVisible(false);
        setContent(null);
    };

    return (
        <PopupContext.Provider value={{ showPopup, hidePopup }}>
            {children}
            <Popup isVisible={isVisible} onClose={hidePopup}>
                {content}
            </Popup>
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);
