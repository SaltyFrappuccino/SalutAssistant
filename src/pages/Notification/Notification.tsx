import React from 'react'
import './Notification.scss'
import buttonClose from '../../resources/buttonClose.svg'
import doneIcon from '../../resources/doneIcon.svg'
import {useNavigate} from "react-router-dom";

interface NotificationProps {
    message: string;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({message, onClose}) => {

    const navigate = useNavigate()

    const handleCardClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className='notification'>

            <div className="notification-body">
                <div className='notification-done'>
                    <img src={doneIcon} alt=""/>
                </div>
                <span className='message-style'>{message}</span>
                <button className='my-order-btn' onClick={() => handleCardClick('/requests')}>Перейти в "Мои заявки"</button>
            </div>
            <div className="notification-header">
                <button className='btn-close-notify' onClick={() => handleCardClick('/')}><img width={36} height={28} src={buttonClose} alt=""/></button>
            </div>
        </div>
    )
}

export default Notification;