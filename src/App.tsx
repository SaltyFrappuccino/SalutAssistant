import React from 'react';
import { RouterProvider } from "react-router-dom";
import './App.css';
import { createBrowserRouter } from "react-router-dom";
import StartPage from './pages/StartPage/StartPage';
import FormPage from "./pages/FormPage/FormPage";
import RequestsList from "./pages/RequestsList/RequestsList";
import VerifyRequest from "./pages/VerifyPages/VerifyRequest";
import VipVerifyRequest from "./pages/VerifyPages/VipVerifyRequest";
import NonTransactionalRequest from "./pages/NonTransactionalPage/NonTransactionalRequest";
import SettlementOfProblemDebt from "./pages/SettlementOfProblemDebt/SettlementOfProblemDebt";
import Foreigners from "./pages/Foreigners/Foreigners";
import ConclusionTransactions from "./pages/ConclusionTransactions/ConclusionTransactions";
import Requests from "./pages/Requests/Requests";
import Registers from "./pages/Registers/Registers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <StartPage />,
    },
    {
        path: "/form",
        element: <FormPage />,
    },
    {
        path: "/requests",
        element: <Requests />,
    },
    {
        path: "/verify",
        element: <VerifyRequest />,
    },
    {
        path: "/vip-verify",
        element: <VipVerifyRequest />,
    },
    {
        path: "/non-transactional",
        element: <NonTransactionalRequest />,
    },
    {
        path: "/settlement-problem-debt",
        element: <SettlementOfProblemDebt />,
    },
    {
        path: "/foreigners",
        element: <Foreigners />,
    },
    {
        path: "/conclusion-transactions",
        element: <ConclusionTransactions />,
    },
    {
        path: "/registers",
        element: <Registers />,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
