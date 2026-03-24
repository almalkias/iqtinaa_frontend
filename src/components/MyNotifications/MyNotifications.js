// import Notification from "../Notification/Notification";
// import React, { useState } from "react";
// import painting from '../../assets/images/Painting-details.png';
// import arrow_left from '../../assets/images/arrow-square-left.svg';
// import arrow_right from '../../assets/images/arrow-square-right.svg';
// import profile_img from '../../assets/images/Ellipse 43.svg';
import "./MyNotifications.css";


function MyNotifications() {
    // const [notification] = useState(
    //     {
    //         profile_image: profile_img,
    //         name: 'Mohammed Khan',
    //         update: 'Added a new artwork, 09:56 AM.',
    //         paint: painting
    //     });

    return (
        <div className='my-notifications'>
            {/* <div className="container">
                <Notification notification={notification} />
                <Notification notification={notification} />
                <Notification notification={notification} />
                <Notification notification={notification} />
                <Notification notification={notification} />
                <Notification notification={notification} />
            </div>
            <div className="navgation">
                <img src={arrow_right} alt="" />
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <img src={arrow_left} alt="" />
            </div> */}
            <h3 id="no-notifications">سيتم تفعيل الاشعارات قريبا </h3>
        </div>
    )
}

export default MyNotifications;
