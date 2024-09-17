import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateFormField, resetForm } from '../../redux/action/formActions';
import HintsBlock from "../../components/HintBlock/HintBlock";
import '../VerifyPages/VerifyRequest.scss';
import burgerIcon from "../../resources/burgerIcon.svg";
import { useNavigate } from "react-router-dom";
import circleSalut from "../../resources/circleSalut.svg";
import closeImg from "../../resources/closeImg.svg";
import {AppDispatch} from "../../redux/store";
import Notification from "../Notification/Notification";
import '../SettlementOfProblemDebt/SettlementOfProblemDebt.scss'
import NorificationAlert from "../Notification/NorificationAlert";

const Registers: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [formState, setFormState] = useState({
        businessProcess: '',
        externalId: '',
        lastName: '',
        firstName: '',
        middleName: '',
        tbObjectName: '',
        initiatorEmail: '',
        comment: '',
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
        const validateEmail = () => {
            if (formState.initiatorEmail === '') {
                setEmailError(null)
                return;
            }

            const emailReg = /^[a-zA-Z0-9._%+-]+@(sberbank.ru|sber.ru|omega.sbrf.ru)$/;
            if (!emailReg.test(formState.initiatorEmail)) {
                setEmailError(
                    <>
                        <span style={{color: 'rgb(239, 107, 37)', fontSize: '12px'}}>
                            Указан некорректный адрес корпоративной электронной почты. Проверьте, что электронная почта, которую вы ввели, с одним из доменов:
                        </span>
                        <span style={{ color: '#fff', fontSize: '12px'}}>  @sberbank.ru    @sber.ru    @omega.sbrf.ru </span>
                    </>)
            } else {
                setEmailError(null)
            }
        }
        validateEmail()
    }, [formState.initiatorEmail])


    // условие - проверка на все поля
    // useEffect(() => {
    //     const validValue = Object.values(formState).every(val => val !== '') && fileList.length > 0;
    //     setSuccessSubmit(validValue)
    // }, [formState, fileList])

    // условие - Отчество, комментарий - не обязательное
    useEffect(() => {
        const requiredFields: (keyof typeof formState)[] = [
            'externalId', 'tbObjectName', 'lastName', 'firstName', 'initiatorEmail'
        ];
        const validValue = requiredFields.every(field => formState[field] !== '') && fileList.length > 0;
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

        setShowErrors(true);

        if (successSubmit) {
            Object.entries(formState).forEach(([field, value]) => {
                dispatch(updateFormField(field, value))
            })

            const formData = new FormData()
            Object.entries(formState).forEach(([field, value]) => {
                formData.append(field, value)
            });
            fileList.forEach(file => {
                formData.append('files', file)
            });

            setNotificationMsg('Заявка успешно создана!')
            setShowNotification(true)

            console.log('Данные формы отправлены в Redux:', formState);
            console.log('Прикрепленные файлы:', fileList);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormState(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const closeNotification = () => {
        setShowNotification(false)
    }

    // const handleCardClick = (path: string) => {
    //     navigate(path);
    // };

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
                        <span style={{ color: 'rgb(165, 165, 165)'}}>Нетиповые заявки /</span>
                        <span style={{ color: '#fff' }}>Реестр</span>
                    </div>
                    <button className='my-order' style={{ color: '#fff' }} onClick={() => handleCardClick('/requests')}>Мои реестры</button>
                </div>


                <div className="main">
                    <div className="form">
                        <div className="form-block">
                            <h2 style={{ fontSize: 20 }}>Создание заявки на контроль качества</h2>
                            <form >
                                <div className="form-content-request">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={burgerIcon} alt="icon" />
                                    </span>
                                    <div className="input-block-category">
                                        <select className="select-realty-category"
                                                value={formState.businessProcess}
                                                onChange={(e) => handleInputChange('businessProcess', e.target.value)}
                                        >
                                            <option value='' disabled>Категория запроса</option>
                                            <option value='Индивидуальные схемы кредитования'>Индивидуальные схемы кредитования</option>
                                            <option value='Кредит на индивидуальных условиях'>Кредит на индивидуальных условиях</option>
                                        </select>
                                    </div>
                                </div>

                                {emailError && (
                                    <div style={{fontSize: '12px', marginBottom: '5px'}}>{emailError}</div>
                                )}
                                {showErrors && !formState.initiatorEmail && (
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
                                <div className="form-button" style={{ marginTop: '20px'}}>
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

export default Registers;
