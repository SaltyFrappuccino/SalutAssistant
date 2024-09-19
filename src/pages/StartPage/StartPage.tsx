import React, {useEffect, useRef} from 'react';
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

const initialize = (getState: () => any) => {
    return createSmartappDebugger({
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI0NTdiMjkxMi1kNzJmLTRkOWMtOTQyOS1lZGNiYjQ2OWFhNGEiLCJzdWIiOiJkMTUwMDA2YTA1YmNmYzcyMTU5NmZhYjczZDNhZjExNmI0NzU1YzY4NGM5NWI4MjdhZTk2NzhhZDUxZGEyODIxNTM5YmU5MjcwMDQyNjI5OCIsImlzcyI6IktFWU1BU1RFUiIsImV4cCI6MTcxNjUzODUyOCwiYXVkIjoiVlBTIiwidXNyIjoiMGMyZDY0NzEtMDg2YS00ZTU5LWJiYzYtNjgwNzI4ZjEyODJlIiwiaWF0IjoxNzE2NDUyMTE4LCJzaWQiOiIxMGY0YmRmNi0yOTA0LTRiY2ItOGY3OC00ZTM5NmEyYjUwOTcifQ.U5ZpqPkpc3oNJD-KI2DYRcaaGnIBhlULtFMb88EmMqDl96esD4d4QWg2syB8A3dFkdRlwUb-dnuFtaYYxBuGB6qhPWQKU5DGT_oznGa7yFl6QtJFoiUCzx8kVRI9zEMPIZ5Sh1w69u-YZg3zkp9frGPl0ekm5WYlfPeAbaLCLtFsGZR0WSHBkIh8z7dVKSO7_2ulIxZRJEGNy82KXzFg-Z72KTTtLLejV0oNi9wZi49_aKxxVXtIwgmdKKvGbJdGifegm1GtD_I-bZGTB4NS6uBbfTpJhXA0GXjb1VviSsYrEcueNb0VoBBakBgt3Jlxcc6-Qu_tpkkhx6Q2N_slCOAGOGkZMIBRMyqtHRWm5IbMuf4XfnYSholVYecJprRGl__lYeyjrY1mKlsaFOr_wsmy-82kCfKsM-VI7pEdc4pf1Ohwjf7HniOXLDXNffufhclH1HIo-HLqwgEjVjFLobSGdbc_I5AZKLcEJ3QSE0OoEZ70_AdINGvEFs0P6hL0gpc1mmKT3dcca6iG8bxrOu81NYD1MeVmEudc_wnfD3ypg_J5Mk1cKtYNtjEdMk2El4tC8-K-6-Rum-AIkiQrJ0_PrcXE4LvC0te-8RXABvqyso-L6bfuMBBInE0YkROdYBXN-Gl5kiQfJoRWMjXSinjScJ-Z29o2ofoUeMJfeAk',
        initPhrase: 'Привет',
        getState,
        nativePanel: {
            defaultText: 'Привет',
            screenshotMode: false,
            tabIndex: -1,
        },
    });
    return createAssistant({ getState });
}

const StartPage: React.FC = () => {
    const navigate = useNavigate();

    const assistantStateRef = useRef<AssistantAppState>();
    const assistantRef = useRef<ReturnType<typeof createAssistant>>();

    // useEffect(() => {
    //     assistantRef.current = initialize(() => assistantStateRef.current);
    //     assistantRef.current.on('data', ({ navigation, action }: any) => {
    //         if (navigation) {
    //             console.log(2)
    //             switch (navigation.command) {
    //                 case 'UP':
    //                     window.scrollTo(0, window.scrollY - 500);
    //                     break;
    //                 case 'DOWN':
    //                     window.scrollTo(0, window.scrollY + 500);
    //                     break;
    //             }
    //         }
    //         if (action) {
    //             console.log(1)
    //             console.log(action)
    //         }
    //     });
    //
    //     document.addEventListener('keydown', handleKeyDown);
    //
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'KeyN') {
            handleCardClick('/form');
        }
        if (event.code === 'KeyM') {
            handleCardClick('/requests');
        }
    };

    const handleCardClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="start-page">
            <div className="main">
                <div className='header-content'>
                    <h3 className='header-h3' style={{ color : '#fff'}}>Заявки</h3>
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
