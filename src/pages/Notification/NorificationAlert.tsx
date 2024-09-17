import React from 'react'
import './Notification.scss'
import buttonClose from '../../resources/buttonClose.svg'
import alertIcon from '../../resources/alertIcon.svg'
import {useNavigate} from "react-router-dom";
import './NotificationALert.scss'

interface NotificationProps {
    message: string;
    onClose: () => void;
}

const NorificationAlert: React.FC<NotificationProps> = ({message, onClose}) => {

    const navigate = useNavigate()

    const handleCardClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className='notification'>

            <div className="notification-body">
                <div className='notification-done'>
                    <img src={alertIcon} alt=""/>
                </div>
                <span className='message-style' style={{ textAlign: 'center', fontSize: '16px'}}>У вас есть не созданная заявка. Данные по ней не будут сохранены.
                    <br/>Вы уверены, что хотите покинуть страницу? </span>
                <div className="button-container">
                    <button className='btn-yes' onClick={() => handleCardClick('/')}>Да</button>
                    <button className='btn-no' onClick={() => onClose()}>Нет</button>
                </div>
            </div>
            <div className="notification-header">
                <button className='btn-close-notify' onClick={onClose}><img width={36} height={28} src={buttonClose} alt=""/></button>
            </div>
        </div>
    )
}

export default NorificationAlert;