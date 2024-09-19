import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.scss';
import clipBoard from "../../resources/clipboard-line.svg"
import clipboardVerifyV1 from "../../resources/clipboardVerifyV1.svg"
import clipboardVerifyVip from "../../resources/clipboardVerifyVip.svg"
import createRequestIMG from "../../resources/createRequest.svg"
import clipboardProfile from "../../resources/clipboardProfile.svg"
import clipBoardNotTr from "../../resources/clipBoardNotTr.svg"
import clipBoardNotTypical from "../../resources/clipBoardNotTypical.svg"
import clipBoardRegularFile from "../../resources/clipBoardRegularFile.svg"
import clipBoardRegistry from "../../resources/clipBoardRegistry.svg"
import buttonClose from "../../resources/buttonClose.svg"
import circleSalut from "../../resources/circleSalut.svg"
import {AssistantAppState, createAssistant, createSmartappDebugger} from "@sberdevices/assistant-client";

const initializeAssistant = (getState: any) => {
    return createAssistant({
        getState,
    });
};


const StartPage: React.FC = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("Заявко")

    const assistantStateRef = useRef<AssistantAppState>();
    const assistantRef = useRef<ReturnType<typeof createAssistant>>();


    useEffect(() => {
        assistantRef.current = initializeAssistant(() => {});

        assistantRef.current.on("data", ({ action }: any) => {
            if (action.type === "OPEN_FORM") {
                setText(action.payload)
                handleCardClick(action.payload);
            } else {
                setText(action.type);
            }
        });
    });


    const handleCardClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="start-page">
            <div className="main">
                <div className='header-content'>
                    <h3 id="zayavki" className='header-h3' style={{ color : '#fff'}}>{text}</h3>
                    <button style={{background: "none", border: 'none', cursor: 'pointer', width: '32px', height: '32px'}}>
                        <img width={32} height={32} src={buttonClose} alt="Clip Board" />
                    </button>
                </div>
            </div>


            {/*<div className="card" onClick={() => handleCardClick('/form')}>*/}
            {/*    <img width={40} height={40} src={createRequestIMG} alt="Create Request" />*/}
            {/*    <p>Создать запрос</p>*/}
            {/*</div>*/}
            <div className="card-body">
                <div className="card" onClick={() => handleCardClick('/requests')}>
                    <img width={35} height={38} src={clipBoard} alt="Clip Board" />
                    <p>Мои заявки</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/verify')}>
                    <img width={35} height={38} src={clipboardVerifyV1} alt="Create Request" />
                    <p>Верификация</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/vip-verify')}>
                    <img width={35} height={38} src={clipboardVerifyVip} alt="Create Request" />
                    <p>VIP.Верификация</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/foreigners')}>
                    <img width={35} height={38} src={clipboardProfile} alt="Create Request" />
                    <p>Иностранцы</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/non-transactional')}>
                    <img width={35} height={38} src={clipBoardNotTr} alt="Create Request" />
                    <p>Нетранзикционные</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/conclusion-transactions')}>
                    <img width={35} height={38} src={clipBoardNotTypical} alt="Create Request" />
                    <p>Нетиповая и сверхлимитная</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/settlement-problem-debt')}>
                    <img width={35} height={38} src={clipBoardRegularFile} alt="Create Request" />
                    <p>Урегулирование задолженности</p>
                </div>
                <div className="card"
                     // onClick={() => handleCardClick('/registers')}
                >
                    <img width={35} height={38} src={clipBoardRegistry} alt="Create Request" />
                    <p>Реестры</p>
                </div>
            </div>

            <div className='footer'>
                <div className="circle" style={{paddingRight: '14px', cursor: 'pointer'}} onClick={() => handleCardClick('/requests')}>
                    <img width={61} height={61} src={circleSalut} alt="Clip Board" />
                </div>
                <div className="salut">
                    <input className='salut-input' type="text" placeholder={'Напишите, чем вам помочь'}/>
                </div>
            </div>

        </div>
    );
};

export default StartPage;
