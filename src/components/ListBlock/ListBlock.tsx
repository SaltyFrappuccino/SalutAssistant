import React, { useState } from 'react';
import RequestsCard from '../RequestsCard/RequestsCard';
import './ListBlock.scss'

interface ListBlockProps {
    requests: {
        title: string;
        type: 'Верификация отчетов' | 'VIP. Верификация отчетов' | 'Нетиповая и сверхлимитная сделки' |
            'Сделка по нетранзакционным продуктам' | 'Иностранные граждане';
        status: 'Выполнена' | 'Отказано' | 'На согласовании' | 'Ошибка' | 'Создана' | 'В Работе'; }[];
}

const ListBlock: React.FC<ListBlockProps> = ({ requests }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <div className="list-block">
            <div className="requests-list-card">
                {requests.map((request, index) => (
                    <RequestsCard
                        key={index}
                        title={request.title}
                        type={request.type}
                        status={request.status}
                        isSelected={selectedIndex === index}
                        onSelect={() => handleSelect(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListBlock;
