import React, {useEffect, useRef, useState} from 'react';
import {AssistantAppState, createAssistant, createSmartappDebugger} from "@sberdevices/assistant-client";
import SearchBlock from "../../components/SearchBlock/SearchBlock";
import FormBlock from "../../components/FormBlock/FormBlock";
import HintsBlock from "../../components/HintBlock/HintBlock";
import "./FormPage.scss"

interface Props {

}

const initialize = (getState: () => any) => {
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI0NTdiMjkxMi1kNzJmLTRkOWMtOTQyOS1lZGNiYjQ2OWFhNGEiLCJzdWIiOiJkMTUwMDA2YTA1YmNmYzcyMTU5NmZhYjczZDNhZjExNmI0NzU1YzY4NGM5NWI4MjdhZTk2NzhhZDUxZGEyODIxNTM5YmU5MjcwMDQyNjI5OCIsImlzcyI6IktFWU1BU1RFUiIsImV4cCI6MTcxNjUzODUyOCwiYXVkIjoiVlBTIiwidXNyIjoiMGMyZDY0NzEtMDg2YS00ZTU5LWJiYzYtNjgwNzI4ZjEyODJlIiwiaWF0IjoxNzE2NDUyMTE4LCJzaWQiOiIxMGY0YmRmNi0yOTA0LTRiY2ItOGY3OC00ZTM5NmEyYjUwOTcifQ.U5ZpqPkpc3oNJD-KI2DYRcaaGnIBhlULtFMb88EmMqDl96esD4d4QWg2syB8A3dFkdRlwUb-dnuFtaYYxBuGB6qhPWQKU5DGT_oznGa7yFl6QtJFoiUCzx8kVRI9zEMPIZ5Sh1w69u-YZg3zkp9frGPl0ekm5WYlfPeAbaLCLtFsGZR0WSHBkIh8z7dVKSO7_2ulIxZRJEGNy82KXzFg-Z72KTTtLLejV0oNi9wZi49_aKxxVXtIwgmdKKvGbJdGifegm1GtD_I-bZGTB4NS6uBbfTpJhXA0GXjb1VviSsYrEcueNb0VoBBakBgt3Jlxcc6-Qu_tpkkhx6Q2N_slCOAGOGkZMIBRMyqtHRWm5IbMuf4XfnYSholVYecJprRGl__lYeyjrY1mKlsaFOr_wsmy-82kCfKsM-VI7pEdc4pf1Ohwjf7HniOXLDXNffufhclH1HIo-HLqwgEjVjFLobSGdbc_I5AZKLcEJ3QSE0OoEZ70_AdINGvEFs0P6hL0gpc1mmKT3dcca6iG8bxrOu81NYD1MeVmEudc_wnfD3ypg_J5Mk1cKtYNtjEdMk2El4tC8-K-6-Rum-AIkiQrJ0_PrcXE4LvC0te-8RXABvqyso-L6bfuMBBInE0YkROdYBXN-Gl5kiQfJoRWMjXSinjScJ-Z29o2ofoUeMJfeAk',
            initPhrase: 'Туц-туц-туц',
            getState,
            nativePanel: {
                defaultText: 'Чипи чипи чапа чапа дуби дуби мага мага, магико ми думи думи бум бум бум',
                screenshotMode: false,
                tabIndex: -1,
            },
        });
    }
    return createAssistant({ getState });
}

const FormPage: React.FC<Props> = ({  }) => {
    const [fileList, setFileList] = useState<File[]>([]); // Состояние для списка файлов
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

    return (
        <div className="app">
            <div className="left-block">
                <SearchBlock items={['ИЖС', 'Реестры ДИС', 'Расчёт ПДН', 'Проверка КИ']}/>
            </div>
            <div className="center-block">
                <FormBlock title="Форма запроса" setFileList={setFileList} />
            </div>
            <div className="right-block">
                <HintsBlock fileList={fileList}  onFileRemove={handleFileRemove} setFileList={setFileList}/>
            </div>
        </div>
    );
};

export default FormPage;
