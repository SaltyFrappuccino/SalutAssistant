import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {updateFormField, resetForm, addFiles, createRequestSuccess} from '../../redux/action/formActions';
import HintsBlock from "../../components/HintBlock/HintBlock";
import './VerifyRequest.scss';
import categoryChoice from "../../resources/categoryChoice.svg";
import numberIcon from "../../resources/numberIcon.svg";
import peopleIcon from "../../resources/peopleIcon.svg";
import houseIcon from "../../resources/houseIcon.svg";
import homeLine from "../../resources/home-line.svg";
import errorIcon from "../../resources/errorIcon.svg";
import emailIcon from "../../resources/emailIcon.svg";
import { useNavigate } from "react-router-dom";
import circleSalut from "../../resources/circleSalut.svg";
import closeImg from "../../resources/closeImg.svg";
import mapIcon from "../../resources/mapIcon.svg";
import {AppDispatch} from "../../redux/store";
import Notification from "../Notification/Notification";
import NorificationAlert from "../Notification/NorificationAlert";

interface EstateObject {
    objectType: string;
    objectCost: string | number;
    tbObjectName?: number;
    objectRegionCode?: string;
    currency?: string;
}

interface Client {
    firstName: string;
    middleName: string;
    lastName: string;
}

interface Organization {
    orgname: string;
}

interface TaskInfo {
    dealMembersNumber: number;
    client: Client;
    organization: Organization;
    estateObjects: EstateObject[];
}

interface TaskInitiator {
    externalId: string;
    source: string;
    tbName: string;
    initiatorEmail: string;
    initiatorID: string;
}

interface BusinessProcess {
    type: string;
    category: string;
}

interface DocumentInfo {
    otrId: string;
    fileName: string;
}

interface FormState {
    taskInitiator: TaskInitiator;
    businessProcess: BusinessProcess;
    taskInfo: TaskInfo;
    clientManagerComment: string;
    documentsInfo: DocumentInfo[];
}

const VerifyRequest: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const [formState, setFormState] = useState({
        taskInitiator: {
            externalId: "",
            source: "",
            tbName: "",
            initiatorEmail: "",
            initiatorID: ""
        },
        businessProcess: {
            type: "TP_6",
            category: ""
        },
        taskInfo: {
            dealMembersNumber: 0,
            client: {
                firstName: "",
                middleName: "",
                lastName: ""
            },
            organization: {
                orgname: ""
            },
            estateObjects: [
                {
                    objectType: "",
                    objectCost: 0,
                    tbObjectName: 0,
                    objectRegionCode: "",
                    currency: "RUB"
                }
            ]
        },
        clientManagerComment: "",
        documentsInfo: [
            {
                otrId: "",
                fileName: null
            }
        ]
    });

    const [fileList, setFileList] = useState<File[]>([]);
    const [showNotification, setShowNotification] = useState(false)
    const [notificationMsg, setNotificationMsg] = useState('')
    const [emailError, setEmailError] = useState<React.ReactNode>(null)
    const [successSubmit, setSuccessSubmit] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [addRealtyObjects, setAddRealtyObjects] = useState<{ objectType: string; objectCost: string }[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const validateEmail = () => {
            if (formState.taskInitiator.initiatorEmail === '') {
                setEmailError(null)
                return;
            }

            const emailReg = /^[a-zA-Z0-9._%+-]+@(sberbank.ru|sber.ru|omega.sbrf.ru)$/;
            if (!emailReg.test(formState.taskInitiator.initiatorEmail)) {
                setEmailError(
                    <>
                        <span style={{color: 'rgb(239, 107, 37)'}}>
                            Указан некорректный адрес корпоративной электронной почты. Проверьте, что электронная почта, которую вы ввели, с одним из доменов:
                        </span>
                        <span style={{ color: '#fff'}}>  @sberbank.ru    @sber.ru    @omega.sbrf.ru </span>
                    </>)
            } else {
                setEmailError(null)
            }
        }
        validateEmail()
    }, [formState.taskInitiator.initiatorEmail])

    // условие - Отчество, комментарий - не обязательное
    useEffect(() => {
        console.log("Form state updated============: ", formState);
        const requiredFields = [
            formState.businessProcess.type,
            // formState.businessProcess.category,
            formState.taskInitiator.externalId,
            formState.taskInitiator.initiatorEmail,
            formState.taskInfo.client.firstName,
            formState.taskInfo.client.lastName,
            // formState.taskInfo.estateObjects[0].objectType,
            // formState.taskInfo.estateObjects[0].objectCost,
            formState.taskInfo.estateObjects[0].objectRegionCode,
        ]
        // const validValue = requiredFields.every(field => formState[field] !== '') && fileList.length > 0;
        const validValue = requiredFields.every(field => field !== '') && fileList.length > 0;
        setSuccessSubmit(validValue);
    }, [formState, fileList]);


    // const assistantStateRef = useRef<AssistantAppState>();
    // const assistantRef = useRef<ReturnType<typeof createAssistant>>();
    //
    // useEffect(() => {
    //     assistantRef.current = initialize(() => assistantStateRef.current);
    //     assistantRef.current.on('data', ({ navigation, action }: any) => {
    //         if (navigation) {
    //             switch (navigation.command) {
    //                 case 'UP':
    //                     window.scrollTo(0, window.scrollY - 500);
    //                     break;
    //                 case 'DOWN':
    //                     window.scrollTo(0, window.scrollY + 500);
    //                     break;
    //             }
    //         }
    //     });
    // }, []);

    const handleFileRemove = (index: number) => {
        const newFileList = [...fileList];
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData()
        fileList.forEach((file) => {
            formData.append('files', file)
        })

        setShowErrors(true);

        if (successSubmit) {
            // Создаем новый объект состояния с учетом заполненных объектов недвижимости
            const filledEstateObjects = addRealtyObjects.filter(
                (obj) => obj.objectType && obj.objectCost
            );

            const tbObjectName = formState.taskInfo.estateObjects[0]?.tbObjectName || "";
            const objectRegionCode = formState.taskInfo.estateObjects[0]?.objectRegionCode || "";

            const updatedFormState = {
                ...formState,
                nameRequest: 'Верификация отчетов',
                taskInfo: {
                    ...formState.taskInfo,
                    estateObjects: filledEstateObjects.map((obj) => ({
                        ...obj,
                        tbObjectName: tbObjectName,
                        objectRegionCode: objectRegionCode
                    })),
                },
                documentsInfo: fileList.map((file, index) => ({
                    otrId: index,
                    fileName: file.name
                }))
            };

            // Создается FormData для отправки на сервер
            Object.entries(updatedFormState).forEach(([field, value]) => {
                if (typeof value === 'object' && value !== null) {
                    formData.append(field, JSON.stringify(value));
                } else {
                    formData.append(field, value as string);
                }
            });

            dispatch(createRequestSuccess(updatedFormState))

            // // Добавляем файлы в FormData
            // fileList.forEach(file => {
            //     formData.append('files', file);
            // });

            // try {
            //     const response = await fetch('/backend', {
            //         method: 'POST',
            //         body: formData,
            //     });
            //
            //     if (response.ok) {
                    setNotificationMsg('Заявка успешно создана!');
                    setShowNotification(true);
            //     } else {
            //         setNotificationMsg('Заявка успешно создана! Без отправки на бэк');
            //         setShowNotification(true);
            //     }
            // } catch (error) {
            //     setNotificationMsg('Ошибка при создании заявки!');
            //     setShowNotification(true);
            // }

            console.log('Данные формы отправлены на сервер:', updatedFormState);
            console.log('Прикрепленные файлы:', fileList);
        }
    }

    const handleInputChange = (field: string, value: string | number | any[]) => {
        console.log(`Поле: ${field}, Значение: ${value}`);
        const fieldParts = field.split('.');
        const topLevelField = fieldParts[0] as keyof typeof formState;



        if (topLevelField === 'taskInitiator') {
            if (fieldParts[1] === 'externalId') {
                setFormState((prevState) => ({
                    ...prevState,
                    taskInitiator: {
                        ...prevState.taskInitiator,
                        externalId: value as string,
                    },
                }));
            } else if (fieldParts[1] === 'initiatorEmail') {
                setFormState((prevState) => ({
                    ...prevState,
                    taskInitiator: {
                        ...prevState.taskInitiator,
                        initiatorEmail: value as string,
                    },
                }));
            }
        }
        if (topLevelField === 'businessProcess') {
            if (fieldParts[1] === 'category') {
                setFormState((prevState) => ({
                    ...prevState,
                    businessProcess: {
                        ...prevState.businessProcess,
                        category: value as string,
                    },
                }));
            }
        } else if (topLevelField === 'taskInfo') {
            if (fieldParts[1] === 'client') {
                const fieldName = fieldParts[2];
                setFormState((prevState) => ({
                    ...prevState,
                    taskInfo: {
                        ...prevState.taskInfo,
                        client: {
                            ...prevState.taskInfo.client,
                            [fieldName]: value,
                        },
                    },
                }));
            } else if (fieldParts[1] === 'estateObjects') {
                const index = parseInt(fieldParts[2], 10);
                const fieldName = fieldParts[3];
                setFormState((prevState) => ({
                    ...prevState,
                    taskInfo: {
                        ...prevState.taskInfo,
                        estateObjects: prevState.taskInfo.estateObjects.map((obj, i) => {
                            if (i === index) {
                                return { ...obj, [fieldName]: value };
                            }
                            return obj;
                        }),
                    },
                }));
            } else {
                const fieldName = fieldParts[1];
                setFormState((prevState) => ({
                    ...prevState,
                    taskInfo: {
                        ...prevState.taskInfo,
                        [fieldName]: value,
                    },
                }));
            }
        } else {
            setFormState((prevState) => ({
                ...prevState,
                [field]: value,
            }));
        }
    };



    const closeNotification = () => {
        setShowNotification(false)
    }

    const handleCardClick = (path: string) => {
        if (Object.values(formState).some(val => val !== '') || fileList.length > 0) {
            setAlertMessage('');
            setShowAlert(true);
        } else {
            navigate(path);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    const handleAddRealtyObject = () => {
        // Получаем текущие значения tbObjectName и objectRegionCode из первой записи в estateObjects
        const currentTbObjectName = formState.taskInfo.estateObjects[0].tbObjectName;
        const currentObjectRegionCode = formState.taskInfo.estateObjects[0].objectRegionCode;

        const newObject = {
            objectType: formState.taskInfo.estateObjects[0].objectType,
            objectCost: formState.taskInfo.estateObjects[0].objectCost,
            tbObjectName: currentTbObjectName, // Присваиваем значение из текущих значений формы
            objectRegionCode: currentObjectRegionCode // Присваиваем значение из текущих значений формы
        };

        //@ts-ignore
        setAddRealtyObjects(prevObjects => [...prevObjects, newObject]);
        //@ts-ignore
        setFormState(prevState => ({
            ...prevState,
            taskInfo: {
                ...prevState.taskInfo,
                estateObjects: [
                    {
                        objectType: '',
                        objectCost: '',
                        tbObjectName: currentTbObjectName, // Присваиваем значение из текущих значений формы
                        objectRegionCode: currentObjectRegionCode // Присваиваем значение из текущих значений формы
                    },
                    ...prevState.taskInfo.estateObjects.slice(1),
                    newObject,
                ],
            }
        }));
    }

    const handleAddRealtyRemove = (index: number) => {

        setFormState(prevState => ({
           ...prevState,
            taskInfo: {
               ...prevState.taskInfo,
                estateObjects: prevState.taskInfo.estateObjects.filter((_, i) => i !== index)
            }
        }))

        setAddRealtyObjects(prevObjects=> prevObjects.filter((_, i) => i !== index))
    }

    return (
        <div className="app">
            <div className="container">
                <div className="up-header">
                    <button className='btn-close' onClick={() => handleCardClick('/')}><img src={closeImg} alt=""/></button>
                </div>
                <div className="header">
                    <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                        <span style={{ color: 'rgb(165, 165, 165)' }}>Нетиповые заявки /</span>
                        <span style={{ color: '#fff' }}>Создание заявки</span>
                    </div>
                    <button className='my-order' style={{ color: '#fff' }} onClick={() => handleCardClick('/requests')}>Мои заявки</button>
                </div>


                <div className="main">
                    <div className="form">
                        <div className="form-block">
                            <h2 style={{ fontSize: 20 }}>Запрос на верификацию отчетов</h2>
                            <form >
                                <div className="form-content-request">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={categoryChoice} alt="icon" />
                                    </span>
                                    <div className="input-block-category">
                                        <div>
                                            <select
                                                className='select-realty-category'
                                                //@ts-ignore
                                                value={formState.businessProcess.category}
                                                onChange={(e) => handleInputChange('businessProcess.category', e.target.value)}
                                            >
                                                <option value="" hidden>Категория запроса</option>
                                                <option value="Реструктуризация">Реструктуризация</option>
                                                <option value="Жилые квартиры, комнаты (нетиповая) RQ_1055">Жилые квартиры, комнаты (нетиповая) RQ_1055</option>
                                                <option value="Жилые дома, участки (нетиповая) RQ_1057">Жилые дома, участки (нетиповая) RQ_1057</option>
                                            </select>
                                            {showErrors && !formState.businessProcess.category && (
                                                <div className="error-message">
                                                    <span className="span-error-info">Обязательное поле</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-content-credit-contract">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={numberIcon} alt="icon" />
                                    </span>
                                    <div className="input-block-contract">
                                        <input
                                            type="text"
                                            placeholder="Номер кредитного договора"
                                            value={formState.taskInitiator.externalId}
                                            onChange={(e) => handleInputChange('taskInitiator.externalId', e.target.value)}
                                        />
                                        {showErrors && !formState.taskInitiator.externalId && (
                                            <div className="error-message">
                                                <span className="span-error-info">Обязательное поле</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    {addRealtyObjects.map((object, index) => (
                                        <div className="hidden-realty-block" key={index}>
                                            <div className="hidden-realty-body">
                                                <span style={{ padding: '8px 40px 8px 10px'}}>{object.objectType}</span>
                                                <span>{object.objectCost}</span>
                                                <button
                                                    type="button"
                                                    style={{
                                                        marginLeft: 'auto',
                                                        background: "transparent",
                                                        border: 'none',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => handleAddRealtyRemove(index)}>
                                                    <img src={closeImg} width={14} height={14} alt=""/>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="form-content-body">
                                        <div className="form-content-realty">
                                        <span className="icon" style={{ marginRight: '10px' }}>
                                            <img width={30} height={30} src={houseIcon} alt="icon" />
                                        </span>
                                            <div className="form-content-real-property">
                                                <select
                                                    className='select-realty'
                                                    value={formState.taskInfo?.estateObjects[0].objectType}
                                                    onChange={(e) => handleInputChange('taskInfo.estateObjects.0.objectType', e.target.value)}
                                                >
                                                    <option value="" disabled hidden>Объект недвижимости</option>
                                                    <option value="ИЖС">ИЖС</option>
                                                    <option value="СНТ">СНТ</option>
                                                </select>
                                            </div>
                                            <div className="form-content-real-property">
                                                <input
                                                    style={{ width: "395px", height: '16px' }}
                                                    type="text"
                                                    placeholder="Стоимость"
                                                    value={formState.taskInfo?.estateObjects[0].objectCost || ''}
                                                    onChange={(e) => handleInputChange('taskInfo.estateObjects.0.objectCost', e.target.value)}
                                                />

                                            </div>
                                        </div>
                                        <button type="button" onClick={handleAddRealtyObject} className='button-realty-add'>Добавить</button>

                                        {showErrors && (addRealtyObjects.length === 0) && (
                                            <div className="error-message" style={{marginLeft: '40px'}}>
                                                <span className="span-error-info">Обязательное поле</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-content-body">
                                    <div className="form-content-bank">
                                        <span className="icon" style={{ marginRight: '10px' }}>
                                            <img width={30} height={30} src={homeLine} alt="icon" />
                                        </span>
                                        <div className="form-content-form-bank">
                                            <select
                                                className='select-bank'
                                                value={formState.taskInfo.estateObjects[0].tbObjectName}
                                                onChange={(e) => handleInputChange('taskInfo.estateObjects.0.tbObjectName', e.target.value)}
                                            >
                                                <option value="" hidden>Территориальный банк расположения объекта недвижимости</option>
                                                <option value="Сбер">Сбер</option>
                                                <option value="Сбербанк">Сбербанк</option>
                                                <option value="СБЕР2">СБЕР</option>
                                                <option value="СБЕЕЕР!!!">СБЕЕЕР!!!</option>
                                            </select>
                                            {showErrors && !formState.taskInfo.estateObjects[0].tbObjectName && (
                                                <div className="error-message">
                                                    <span className="span-error-info">Обязательное поле</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-content-body">
                                    <div className="form-region-object">
                                        <span className="icon" style={{ marginRight: '10px' }}>
                                            <img width={30} height={30} src={mapIcon} alt="icon" />
                                        </span>
                                        <div className="form-content-region-object">
                                            <select
                                                className='select-region'
                                                value={formState.taskInfo.estateObjects[0].objectRegionCode}
                                                onChange={(e) => handleInputChange('taskInfo.estateObjects.0.objectRegionCode', e.target.value)}
                                            >
                                                <option value="" disabled hidden>Регион расположения объекта недвижимости</option>
                                                <option value="регион1">регион1</option>
                                                <option value="регион2">регион2</option>
                                                <option value="регион3">регион3</option>
                                            </select>
                                            {showErrors && !formState.taskInfo.estateObjects[0].objectRegionCode && (
                                                <div className="error-message">
                                                    <span className="span-error-info">Обязательное поле</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-content-fio">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={peopleIcon} alt="icon" />
                                    </span>
                                    <div className="input-block">
                                        <input
                                            maxLength={84}
                                            style={{ marginRight: '10px' }}
                                            className='fio'
                                            type="text"
                                            placeholder="Фамилия"
                                            value={formState.taskInfo.client.lastName}
                                            onChange={(e) => handleInputChange('taskInfo.client.lastName', e.target.value)}
                                        />
                                        <input
                                            maxLength={84}
                                            style={{ marginRight: '10px' }}
                                            className='fio'
                                            type="text"
                                            placeholder="Имя"
                                            value={formState.taskInfo.client.firstName}
                                            onChange={(e) => handleInputChange('taskInfo.client.firstName', e.target.value)}
                                        />
                                        <input
                                            maxLength={84}
                                            className='fio'
                                            type="text"
                                            placeholder="Отчество"
                                            value={formState.taskInfo.client.middleName}
                                            onChange={(e) => handleInputChange('taskInfo.client.middleName', e.target.value)}
                                        />
                                        <div style={{ display: 'flex'}}>
                                            {showErrors && !formState.taskInfo.client.lastName && (
                                                <div className="error-message" style={{ marginRight: '102px'}}>
                                                    <span className="span-error-info">Обязательное поле</span> Фамилия
                                                </div>
                                            )}
                                            {showErrors && !formState.taskInfo.client.firstName && (
                                                <div className="error-message">
                                                    <span className="span-error-info">Обязательное поле</span> Имя
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-content-email">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={emailIcon} alt="icon" />
                                    </span>
                                    <div className="input-block-email">
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            value={formState.taskInitiator.initiatorEmail}
                                            onChange={(e) => handleInputChange('taskInitiator.initiatorEmail', e.target.value)}
                                        />
                                        {emailError && (
                                            <img className='errorImg' src={errorIcon} alt=""/>
                                        )}
                                    </div>
                                </div>

                                <div className="form-comment">
                                    <textarea
                                        maxLength={1000}
                                        placeholder="Комментарий"
                                        value={formState.clientManagerComment}
                                        onChange={(e) => handleInputChange('clientManagerComment', e.target.value)}
                                    ></textarea>
                                </div>
                                {emailError && (
                                    <div style={{fontSize: '12px', marginBottom: '5px'}}>{emailError}</div>
                                )}
                                {showErrors && !formState.taskInitiator.initiatorEmail && (
                                    <div className="error-message">
                                         <span style={{color: 'rgb(239, 107, 37)'}}>
                                             Указан некорректный адрес корпоративной электронной почты. Проверьте, что электронная почта, которую вы ввели, с одним из доменов:
                                         </span>
                                        <span style={{ color: '#fff'}}>  @sberbank.ru    @sber.ru    @omega.sbrf.ru </span>
                                    </div>
                                )}
                                {showErrors && fileList.length === 0 && (
                                    <div className="error-message">
                                        <span className="span-error-info">Отсутствуют документы.</span> Прикрепите документы к заявке</div>
                                )}
                                <div className="form-button-verify">
                                    <button
                                        onClick={handleSubmit}
                                        type="submit" className="create-request-btn">Создать заявку</button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="right-block-request">
                        <HintsBlock fileList={fileList} onFileRemove={handleFileRemove} setFileList={setFileList} />
                    </div>
                </div>

                {showNotification && (
                    <Notification message={notificationMsg} onClose={closeNotification} />
                )}
                {showAlert && (
                    <NorificationAlert message={alertMessage} onClose={closeAlert} />
                )}

                <div className='footer-verify'>
                    <div className="circle" style={{ paddingRight: '14px', cursor: 'pointer' }} onClick={() => handleCardClick('/requests')}>
                        <img width={61} height={61} src={circleSalut} alt="Clip Board" />
                    </div>
                    <div className="salut">
                        <input className='salut-input' type="text" placeholder={'Напишите, чем вам помочь'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyRequest;
