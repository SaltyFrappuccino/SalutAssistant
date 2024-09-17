import React, { useState } from 'react';
import './FormBlock.scss';
import homeLine from '../../resources/home-line.svg';
import creativeCommonsByLine from '../../resources/edit-line.svg';
import EditLine from '../../resources/edit-line.svg';
import FileLine from '../../resources/file-line.svg';
import FilterSortingToolIcon from '../../resources/filter_filters_funnel_list_sort_sorting_tool_icon_123213.svg';
import PriceTag from '../../resources/price-tag-2-line.svg';
import ServiceFill from '../../resources/service-fill.svg';

interface FormBlockProps {
    title: string;
    setFileList: React.Dispatch<React.SetStateAction<File[]>>;
}

const FormBlock: React.FC<FormBlockProps> = ({ title, setFileList }) => {
    const [fileList, setLocalFileList] = useState<File[]>([]);
    const [formState, setFormState] = useState({
        requestType: 'Item 1',
        contractNumber: '',
        clientName: '',
        propertyList: '',
        propertyCost: '',
        territory: 'Item 1',
        isVip: '',
        comment: ''
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setLocalFileList([...fileList, ...filesArray]);
            setFileList([...fileList, ...filesArray]);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className="form-block">
            <h2 style={{fontSize:20 }}>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <span className="icon"><img src={EditLine} alt="icon" /></span>
                    <select value={formState.requestType} onChange={(e) => setFormState({ ...formState, requestType: e.target.value })}>
                        <option value="" disabled hidden>Тип запроса</option>
                        <option value="Item 1">ИЖС</option>
                        <option value="Item 2">Другой тип</option>
                    </select>
                </div>
                <div className="form-group">
                    <span className="icon"><img src={FileLine} alt="icon" /></span>
                    <input type="text" placeholder="Номер кредитного договора" />
                </div>
                <div className="form-group">
                    <span className="icon"><img src={creativeCommonsByLine} alt="icon" /></span>
                    <input type="text" placeholder="ФИО клиента" />
                </div>
                <div className="form-group">
                    <span className="icon"><img src={homeLine} alt="icon" /></span>
                    <input type="text" placeholder="Перечень объектов недвижимости" />
                </div>
                <div className="form-group">
                    <span className="icon"><img src={homeLine} alt="icon" /></span>
                    <input type="text" placeholder="Стоимость объектов недвижимости" />
                </div>
                <div className="form-group">
                    <span className="icon"><img src={PriceTag} alt="icon" /></span>
                    <select value={formState.territory} onChange={(e) => setFormState({ ...formState, territory: e.target.value })}>
                        <option value="" disabled hidden>Территориальный блок</option>
                        <option value="Item 1">Сбер</option>
                        <option value="Item 2">Сбербанк</option>
                        <option value="Item 3">СБЕР</option>
                        <option value="Item 4">СБЕЕЕР!!!</option>
                    </select>
                </div>
                <div className="form-group">
                    <span className="icon"><img src={ServiceFill} alt="icon" /></span> {/* Вставляем изображение */}
                    <input type="text" placeholder="Признак VIP" value={formState.isVip} onChange={(e) => setFormState({ ...formState, isVip: e.target.value })} />
                </div>
                <div className="form-group">
                    {/*<textarea placeholder="Комментарий"></textarea>*/}
                    <input type="file" onChange={handleFileChange} multiple />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="save-btn">Сохранить</button>
                    <button type="submit" className="create-request-btn">Создать Запрос</button>
                </div>
            </form>
        </div>
    );
}

export default FormBlock;
