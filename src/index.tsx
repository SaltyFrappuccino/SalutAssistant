// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import StartPage from './pages/StartPage/StartPage';
// import FormPage from "./pages/FormPage/FormPage";
// import RequestsList from "./pages/RequestsList/RequestsList";
// import VerifyRequest from "./pages/VerifyPages/VerifyRequest";
// import {Provider} from "react-redux";
// import App from "./App";
// import store from "./redux/store";
//
// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
//
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <StartPage />,
//     },
//     {
//         path: "/form",
//         element: <FormPage />,
//     },
//     {
//         path: "/requests",
//         element: <RequestsList />,
//     },
//     {
//         path: "/verify",
//         element: <VerifyRequest />,
//     },
// ]);
//
// root.render(
//     // <RouterProvider router={router}/>
//     <Provider store={store}>
//         <App/>
//     </Provider>
// );


//v3
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
