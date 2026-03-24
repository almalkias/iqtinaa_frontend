import "./Notification.css";

function Notification({ notification }) {
    return (
        <div className='notification'>
            <div className="notification-container">
                <div className="notification-info">
                    <img src={notification.profile_image} alt="" />
                    <div>
                        <h3>{notification.name}</h3>
                        <p>{notification.update}</p>
                    </div>
                </div>
                <img src={notification.paint} alt="" id="paint-img" />
            </div>
        </div >
    )
}

export default Notification;