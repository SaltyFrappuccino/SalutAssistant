import React from 'react';
import './RequestsCard.scss';

interface RequestsCardProps {
    title: string;
    type: 'Верификация отчетов' | 'VIP. Верификация отчетов' | 'Нетиповая и сверхлимитная сделки' |
    'Сделка по нетранзакционным продуктам' | 'Иностранные граждане';
    status: 'Выполнена' | 'Отказано' | 'На согласовании' | 'Ошибка' | 'Создана' | 'В Работе';
    isSelected: boolean;
    onSelect: () => void;
}

const RequestsCard: React.FC<RequestsCardProps> = ({ title, type, status, isSelected, onSelect }) => {
    const statusStyles = {
        'Выполнена': {
            background: 'linear-gradient(45deg, rgb(47, 214, 92), rgb(32, 193, 199))'
        },
        'Отказано': {
            background: 'linear-gradient(45deg, rgb(245, 174, 76), rgb(250, 140, 174))'
        },
        'На согласовании': {
            background: 'rgb(239, 107, 37)'
        },
        'Ошибка': {
            background: 'rgb(220, 40, 58)'
        },
        'Создана': {
            background: 'rgb(239, 107, 37)'
        },
        'В Работе': {
            background: 'rgb(239, 107, 37)'
        }
    };

    return (
        <div className={`request-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
            <div className="request-card-table-body">
                <div className="request-title" >{title}</div>
                <div className="request-type">{type}</div>
            </div>
            {/*<div className="request-status">*/}
            <div className="" style={{ fontSize: '14px'}}>
                <p style={statusStyles[status]} >{status}</p>
            </div>
        </div>
    );
};

export default RequestsCard;
