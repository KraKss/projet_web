import { useState, useCallback } from 'react';

const useNotification = () => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message, type, duration = 3000) => {
        setNotification({ message, type });

        setTimeout(() => {
            setNotification(null);
        }, duration);
    }, []);

    return { notification, showNotification };
};

export default useNotification;
