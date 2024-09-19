import React, {useEffect, useMemo, useRef, useState} from 'react';
import { AssistantAppState, createAssistant, createSmartappDebugger } from "@sberdevices/assistant-client";
import SearchBlock from "../../components/SearchBlock/SearchBlock";
import ListBlock from "../../components/ListBlock/ListBlock";
import HintsBlock from "../../components/HintBlock/HintBlock";
import noResultsIcon from '../../resources/noResultsIcon.svg'
import {useNavigate} from "react-router-dom";
import './RequestsList.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {createRequestSuccess} from "../../redux/action/formActions";

interface Props {}

interface Request {
    title: string;
    type: 'Верификация отчетов' | 'VIP. Верификация отчетов' | 'Нетиповая и сверхлимитная сделки' |
        'Сделка по нетранзакционным продуктам' | 'Иностранные граждане';
    status: 'Выполнена' | 'Отказано' | 'На согласовании' | 'Ошибка' | 'Создана' | 'В Работе';
}

// const initialize = (getState: () => any) => {
//     if (process.env.NODE_ENV === 'development') {
//         return createSmartappDebugger({
//             token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI0NTdiMjkxMi1kNzJmLTRkOWMtOTQyOS1lZGNiYjQ2OWFhNGEiLCJzdWIiOiJkMTUwMDA2YTA1YmNmYzcyMTU5NmZhYjczZDNhZjExNmI0NzU1YzY4NGM5NWI4MjdhZTk2NzhhZDUxZGEyODIxNTM5YmU5MjcwMDQyNjI5OCIsImlzcyI6IktFWU1BU1RFUiIsImV4cCI6MTcxNjUzODUyOCwiYXVkIjoiVlBTIiwidXNyIjoiMGMyZDY0NzEtMDg2YS00ZTU5LWJiYzYtNjgwNzI4ZjEyODJlIiwiaWF0IjoxNzE2NDUyMTE4LCJzaWQiOiIxMGY0YmRmNi0yOTA0LTRiY2ItOGY3OC00ZTM5NmEyYjUwOTcifQ.U5ZpqPkpc3oNJD-KI2DYRcaaGnIBhlULtFMb88EmMqDl96esD4d4QWg2syB8A3dFkdRlwUb-dnuFtaYYxBuGB6qhPWQKU5DGT_oznGa7yFl6QtJFoiUCzx8kVRI9zEMPIZ5Sh1w69u-YZg3zkp9frGPl0ekm5WYlfPeAbaLCLtFsGZR0WSHBkIh8z7dVKSO7_2ulIxZRJEGNy82KXzFg-Z72KTTtLLejV0oNi9wZi49_aKxxVXtIwgmdKKvGbJdGifegm1GtD_I-bZGTB4NS6uBbfTpJhXA0GXjb1VviSsYrEcueNb0VoBBakBgt3Jlxcc6-Qu_tpkkhx6Q2N_slCOAGOGkZMIBRMyqtHRWm5IbMuf4XfnYSholVYecJprRGl__lYeyjrY1mKlsaFOr_wsmy-82kCfKsM-VI7pEdc4pf1Ohwjf7HniOXLDXNffufhclH1HIo-HLqwgEjVjFLobSGdbc_I5AZKLcEJ3QSE0OoEZ70_AdINGvEFs0P6hL0gpc1mmKT3dcca6iG8bxrOu81NYD1MeVmEudc_wnfD3ypg_J5Mk1cKtYNtjEdMk2El4tC8-K-6-Rum-AIkiQrJ0_PrcXE4LvC0te-8RXABvqyso-L6bfuMBBInE0YkROdYBXN-Gl5kiQfJoRWMjXSinjScJ-Z29o2ofoUeMJfeAk',
//             initPhrase: 'Туц-туц-туц',
//             getState,
//             nativePanel: {
//                 defaultText: 'Туц-туц-туц, это Демо Проекта!',
//                 screenshotMode: false,
//                 tabIndex: -1,
//             },
//         });
//     }
//     return createAssistant({ getState });
// }

interface Props {
    selectedStatusFilters: string[];
    selectedTypeFilters: string[];
    searchInput: string;
}

const RequestsList: React.FC<Props> = ({selectedStatusFilters, selectedTypeFilters, searchInput}) => {
    const [fileList, setFileList] = useState<File[]>([]);
    // const [requests, setRequests] = useState<Request[]>([
    //     { title: '135-000-001-002', type: 'Верификация отчетов', status: 'Выполнена' },
    //     { title: '135-000-001-002', type: 'VIP. Верификация отчетов', status: 'Отказано' },
    //     { title: '135-000-001-003', type: 'Нетиповая и сверхлимитная сделки', status: 'На согласовании' },
    //     { title: '135-000-001-005', type: 'Сделка по нетранзакционным продуктам', status: 'Выполнена' },
    //     { title: '135-000-001-007', type: 'Иностранные граждане', status: 'Отказано' },
    //     { title: '135-000-001-012', type: 'Сделка по нетранзакционным продуктам', status: 'На согласовании' },
    //     { title: '135-000-001-0015', type: 'Верификация отчетов', status: 'Ошибка' },
    //     { title: '135-000-001-0325', type: 'Верификация отчетов', status: 'Выполнена' },
    // ]);

    const navigate = useNavigate();

    const handleCardClick = (path: string) => {
        navigate(path);
    };

    const dispatch: AppDispatch = useDispatch();

    const requestsInfo = useSelector((state:RootState) => state.form.requests);
    console.log('req', requestsInfo)
    // const [requests, setRequests] = useState([requests111])
    const [requests, setRequests] = useState<any[]>([])

    const types = requestsInfo.flatMap((request) => request.businessProcess?.type);
    console.log('types', types); // должно зарегистрировать ["Реструктуризация"]



    useEffect(() => {
        const mappedRequests = requestsInfo.map((req) => ({
            title: req.taskInitiator.externalId,
            // type: req.businessProcess?.type || 'Должен тянуться тип',
            type: req.nameRequest || 'Должен тянуться тип',
            status: req.taskInfo.status || 'Должен тянуться статус'
        }))
        setRequests(mappedRequests)
    }, [requestsInfo]);

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

    console.log('selectedStatusFilters', selectedStatusFilters)
    console.log('selectedTypeFilters', selectedTypeFilters)
    const filteredRequests = useMemo(() => {
        return requests.filter((request) => {
            const statusMatch = selectedStatusFilters.length === 0 || selectedStatusFilters.includes(request.status);
            const typeMatch = selectedTypeFilters.length === 0 || selectedTypeFilters.includes(request.type);
            const searchMatch = !searchInput || request.title.includes(searchInput);
            return statusMatch && typeMatch && searchMatch;
        });
    }, [requests, selectedStatusFilters, selectedTypeFilters, searchInput]);

    if (filteredRequests.length === 0) {
        return (
            <div className="no-results">
                <img width={490} height={320} src={noResultsIcon} alt=""/>
                <h4 style={{ margin: '15px 0 8px 0'}}>Заявки не найдены</h4>
                <h4 style={{color: 'rgba(255, 255, 255, 0.56)'}}>Попробуйте поискать что-нибудь еще</h4>
            </div>
        );
    }
    return (
        <div className="request-list-main">
            <div className="request-list-body">
                <ListBlock requests={filteredRequests} />
            </div>
        </div>
    );
};

export default RequestsList;
