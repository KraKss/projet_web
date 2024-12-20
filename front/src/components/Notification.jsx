const Notification = ({ notification }) => {
    if (!notification) return null;

    const { message, type } = notification;

    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
        </div>
    );
};

export default Notification;
