import React, {useEffect, useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import {updateFormField, resetForm, createRequestSuccess} from '../../redux/action/formActions';
import HintsBlock from "../../components/HintBlock/HintBlock";
import '../VerifyPages/VerifyRequest.scss';
import './ConclussionTransactions.scss';
import categoryChoice from "../../resources/categoryChoice.svg";
import numberIcon from "../../resources/numberIcon.svg";
import peopleIcon from "../../resources/peopleIcon.svg";
import homeLine from "../../resources/home-line.svg";
import errorIcon from "../../resources/errorIcon.svg";
import emailIcon from "../../resources/emailIcon.svg";
import { useNavigate } from "react-router-dom";
import circleSalut from "../../resources/circleSalut.svg";
import closeImg from "../../resources/closeImg.svg";
import {AppDispatch} from "../../redux/store";
import Notification from "../Notification/Notification";
import '../SettlementOfProblemDebt/SettlementOfProblemDebt.scss'
import NorificationAlert from "../Notification/NorificationAlert";
import { createAssistant } from '@sberdevices/assistant-client';

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

const initializeAssistant = (getState: any) => {
    return createAssistant({
        getState,
    });
};

const ConclusionTransactions: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const assistantRef = useRef<ReturnType<typeof createAssistant>>();
    const [formState, setFormState] = useState({
        taskInitiator: {
            externalId: "",
            source: "",
            tbName: "",
            initiatorEmail: "",
            initiatorID: ""
        },
        businessProcess: {
            type: "TP_7",
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

    const navigate = useNavigate();

    useEffect(() => {
        assistantRef.current = initializeAssistant(() => {});

        assistantRef.current.on("data", ({ action }: any) => {
            if (action.type === "") {
            }
        });
    });

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
    // useEffect(() => {
    //     let requiredFields: (keyof typeof formState)[] = [];
    //     if (formState.businessProcess.category === 'Индивидуальные схемы кредитования RQ_435') {
    //         requiredFields = [
    //             'taskInitiator',
    //             'taskInfo',
    //             'clientManagerComment'
    //         ];
    //     } else if (formState.businessProcess.category === 'Кредит на индивидуальных условиях RQ_485') {
    //         requiredFields = [
    //             'taskInitiator',
    //             'taskInfo',
    //             'clientManagerComment'
    //         ];
    //     }
    //     const validValue = requiredFields.every(field => {
    //         let fieldValue = formState[field];
    //         if (field === 'taskInitiator' && typeof fieldValue === 'object' && fieldValue !== null && 'externalId' in fieldValue && 'initiatorEmail' in fieldValue) {
    //             return fieldValue.externalId !== '' && fieldValue.initiatorEmail !== '';
    //         } else if (field === 'taskInfo' && typeof fieldValue === 'object' && fieldValue !== null && 'dealMembersNumber' in fieldValue && 'client' in fieldValue &&
    //         'organization' in fieldValue) {
    //             return fieldValue.dealMembersNumber > 0 && fieldValue.client && fieldValue.client.firstName !== '' && fieldValue.client.lastName !== '' &&
    //                 fieldValue.organization.orgname !== '';
    //         } else {
    //             return fieldValue !== '';
    //         }
    //     }) && fileList.length > 0;
    //     setSuccessSubmit(validValue);
    // }, [formState, fileList]);

    //v2
    useEffect(() => {
        let validValue = true;

        switch (formState.businessProcess.category) {
            case 'Индивидуальные схемы кредитования RQ_435':
                validValue =
                    formState.taskInitiator.externalId !== '' &&
                    formState.taskInfo.organization.orgname !== '' &&
                    formState.taskInitiator.initiatorEmail !== '' &&
                    fileList.length > 0;
                break;
            case 'Кредит на индивидуальных условиях RQ_485':
                validValue =
                    formState.taskInitiator.externalId !== '' &&
                    formState.taskInfo.client.lastName !== '' &&
                    formState.taskInfo.client.firstName !== '' &&
                    formState.taskInitiator.initiatorEmail !== '' &&
                    fileList.length > 0;
                break;
            default:
                validValue = false;
        }

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setFileList([...fileList, ...filesArray]);
        }
    };

    //вывод в консоль файлов, которые были добавлены
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData()
        fileList.forEach(file => {
            formData.append('files', file)
        });

        setShowErrors(true);

        if (successSubmit) {
            Object.entries(formState).forEach(([field, value]) => {
                dispatch(updateFormField(field, typeof value === 'string' ? value : ''))
            })

            const updatedFormState = {
                ...formState,
                nameRequest: 'Нетиповая и сверхлимитная сделки',
                taskInfo: {
                    ...formState.taskInfo,
                },
                documentsInfo: fileList.map((file, index) => ({
                    otrId: index,
                    fileName: file.name
                }))
            };

            Object.entries(formState).forEach(([field, value]) => {
                formData.append(field, typeof value === 'string' ?  value : JSON.stringify(value))
            });

            setNotificationMsg('Заявка успешно создана!')
            setShowNotification(true)

            dispatch(createRequestSuccess(updatedFormState))

            assistantRef.current?.sendData({
                action: {
                    action_id: 'ConclusionTransactions_done',
                    parameters: {
                        formState
                    }
                }
            });

            console.log('Данные формы отправлены в Redux:', updatedFormState);
            console.log('Прикрепленные файлы:', fileList);
        }
    };

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
            } else if (fieldParts[1] === 'tbName') {
                setFormState((prevState => ({
                    ...prevState,
                    taskInitiator: {
                        ...prevState.taskInitiator,
                        tbName: value as string,
                    }
                })))
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
        }
        else if (topLevelField === 'taskInfo') {
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
            }
            else if (fieldParts[1] === 'organization' && fieldParts[2] === 'orgname') {

                setFormState((prevState => ({
                    ...prevState,
                    taskInfo: {
                        ...prevState.taskInfo,
                        organization: {
                            ...prevState.taskInfo.organization,
                            orgname: value as string,
                        },
                    },
                })))
            }
            else if (fieldParts[1] === 'estateObjects') {
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

    return (
        <div className="app" style={{ height: '100vh'}}>
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
                            <h2 style={{ fontSize: 20 }}>Заключение нетиповой и сверхлимитной сделки</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-content-request">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={categoryChoice} alt="icon" />
                                    </span>
                                    <div className="input-block-category">
                                        <select className="select-realty-category"
                                            //@ts-ignore
                                            value={formState.businessProcess.category}
                                            onChange={(e) => handleInputChange('businessProcess.category', e.target.value)}
                                        >
                                            <option value='' >Категория запроса</option>
                                            <option value='Индивидуальные схемы кредитования RQ_435'>Индивидуальные схемы кредитования RQ_435</option>
                                            <option value='Кредит на индивидуальных условиях RQ_485'>Кредит на индивидуальных условиях RQ_485</option>
                                        </select>
                                    </div>
                                </div>

                                {formState.businessProcess && (
                                    <>
                                        { /* Индивидуальные схемы кредитования */ }
                                        {/*@ts-ignore*/}
                                        {formState.businessProcess.category === 'Индивидуальные схемы кредитования RQ_435' && (
                                            <div>
                                                <div className="form-content-credit-contract">
                                                    <span className="icon" style={{marginRight: '10px'}}>
                                                        <img width={30} height={30} src={numberIcon} alt="icon"/>
                                                    </span>
                                                    <div className="input-block-contract">
                                                        <input
                                                            type="text"
                                                            placeholder="Номер кредитного договора"
                                                            value={formState.taskInitiator.externalId}
                                                            onChange={(e) => handleInputChange('taskInitiator.externalId', e.target.value)}/>
                                                        {showErrors && !formState.taskInitiator.externalId && (
                                                            <div className="error-message">
                                                                <span className="span-error-info">Обязательное поле</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="form-content-body">
                                                    <div className="form-content-bank">
                                                    <span className="icon" style={{marginRight: '10px'}}>
                                                        <img width={30} height={30} src={homeLine} alt="icon"/>
                                                    </span>
                                                        <div className="form-content-form-bank">
                                                            <select
                                                                className='select-bank'
                                                                value={formState.taskInfo.organization.orgname}
                                                                onChange={(e) => handleInputChange('taskInfo.organization.orgname', e.target.value)}
                                                            >
                                                                <option value="" disabled>Название организации</option>
                                                                <option value="Организация 1">Организация 1</option>
                                                                <option value="Организация 2">Организация 2</option>
                                                                <option value="Организация 3">Организация 3</option>
                                                                <option value="Организация 4">Организация 4</option>
                                                            </select>
                                                            {showErrors && !formState.taskInfo.organization.orgname && (
                                                                <div className="error-message" style={{ marginBottom: '5px'}}>
                                                                    <span className="span-error-info">Обязательное поле</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-content-email">
                                                <span className="icon" style={{marginRight: '10px'}}>
                                                    <img width={30} height={30} src={emailIcon} alt="icon"/>
                                                </span>
                                                    <div className="input-block-email">
                                                        <input
                                                            type="text"
                                                            placeholder="Email"
                                                            value={formState.taskInitiator.initiatorEmail}
                                                            onChange={(e) => handleInputChange('taskInitiator.initiatorEmail', e.target.value)}/>
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
                                                {/*{fileList.length === 0 && (*/}
                                                {/*    <div style={{ fontSize: '12px' }}><span style={{color: 'rgb(239, 107, 37)'}}>Отсутствуют документы.</span> Прикрепите документы к заявке</div>*/}
                                                {/*)}*/}
                                                {showErrors && fileList.length === 0 && (
                                                    <div className="error-message">
                                                        <span className="span-error-info">Отсутствуют документы.</span> Прикрепите документы к заявке</div>
                                                )}
                                            </div>
                                        )}

                                        { /* Кредит на индивидуальных условиях */ }
                                        {/*@ts-ignore*/}
                                        {formState.businessProcess.category === 'Кредит на индивидуальных условиях RQ_485' && (
                                            <div>
                                                <div className="form-content-credit-contract">
                                            <span className="icon" style={{marginRight: '10px'}}>
                                                <img width={30} height={30} src={numberIcon} alt="icon"/>
                                            </span>
                                                    <div className="input-block-contract">
                                                        <input
                                                            type="text"
                                                            placeholder="Номер кредитного договора"
                                                            value={formState.taskInitiator.externalId}
                                                            onChange={(e) => handleInputChange('taskInitiator.externalId', e.target.value)}/>
                                                        {showErrors && !formState.taskInitiator.externalId && (
                                                            <div className="error-message">
                                                                <span className="span-error-info">Обязательное поле</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-content-fio">
                                                <span className="icon" style={{marginRight: '10px'}}>
                                                    <img width={30} height={30} src={peopleIcon} alt="icon"/>
                                                </span>
                                                    <div className="input-block">
                                                        <input
                                                            maxLength={84}
                                                            style={{marginRight: '10px'}}
                                                            className='fio'
                                                            type="text"
                                                            placeholder="Фамилия"
                                                            value={formState.taskInfo.client.lastName}
                                                            onChange={(e) => handleInputChange('taskInfo.client.lastName', e.target.value)}/>
                                                        <input
                                                            maxLength={84}
                                                            style={{marginRight: '10px'}}
                                                            className='fio'
                                                            type="text"
                                                            placeholder="Имя"
                                                            value={formState.taskInfo.client.firstName}
                                                            onChange={(e) => handleInputChange('taskInfo.client.firstName', e.target.value)}/>
                                                        <input
                                                            maxLength={84}
                                                            className='fio'
                                                            type="text"
                                                            placeholder="Отчество"
                                                            value={formState.taskInfo.client.middleName}
                                                            onChange={(e) => handleInputChange('taskInfo.client.middleName', e.target.value)}/>
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
                                                <span className="icon" style={{marginRight: '10px'}}>
                                                    <img width={30} height={30} src={emailIcon} alt="icon"/>
                                                </span>
                                                    <div className="input-block-email">
                                                        <input
                                                            type="text"
                                                            placeholder="Email"
                                                            value={formState.taskInitiator.initiatorEmail}
                                                            onChange={(e) => handleInputChange('taskInitiator.initiatorEmail', e.target.value)}/>
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
                                                {/*{fileList.length === 0 && (*/}
                                                {/*    <div style={{ fontSize: '12px' }}><span style={{color: 'rgb(239, 107, 37)'}}>Отсутствуют документы.</span> Прикрепите документы к заявке</div>*/}
                                                {/*)}*/}
                                                {showErrors && fileList.length === 0 && (
                                                    <div className="error-message">
                                                        <span className="span-error-info">Отсутствуют документы.</span> Прикрепите документы к заявке</div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}



                                <div className="form-button" style={{ marginTop: '20px', marginBottom: '40px'}}>
                                    <button className="create-request-btn">Создать заявку</button>
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

export default ConclusionTransactions;
