import {
    ADD_FILES,
    ADD_REALTY_OBJECT,
    CREATE_REQUEST_SUCCESS,
    FormActionTypes,
    RESET_FORM,
    UPDATE_FORM_FIELD
} from '../action/formActions';

// interface FormState {
//     taskInitiator: {
//         externalId: string;
//         source: string;
//         tbName: string;
//         initiatorEmail: string;
//         initiatorID: string;
//     };
//     businessProcess: {
//         type: string;
//         category: string;
//     };
//     taskInfo: {
//         dealMembersNumber: number;
//         client: {
//             firstName: string;
//             middleName: string;
//             lastName: string;
//         };
//         organization: {
//             orgname: string;
//         };
//         estateObjects: {
//             objectType: string;
//             objectCost: number;
//             tbObjectName: string;
//             objectRegionCode: string;
//             currency: string;
//         }[];
//     };
//     clientManagerComment: string;
//     documentsInfo: {
//         otrId: string;
//         fileName: string;
//     }[];
//     files: File[];
//     addRealtyObjects: {objectType: string, objectCost: string}[],
//     requests: [],
// }

interface FormState {
    requests: {
        taskInitiator: {
            externalId: string;
            source: string;
            tbName: string;
            initiatorEmail: string;
            initiatorID: string;
        };
        businessProcess: {
            type: string;
            category: string;
        };
        taskInfo: {
            dealMembersNumber: number;
            client: {
                firstName: string;
                middleName: string;
                lastName: string;
            };
            organization: {
                orgname: string;
            };
            estateObjects: {
                objectType: string;
                objectCost: number;
                tbObjectName: string;
                objectRegionCode: string;
                currency: string;
            }[];
        };
        clientManagerComment: string;
        documentsInfo: {
            otrId: string;
            fileName: string;
        }[];
    }[];
}

// const initialState: FormState = {
//     taskInitiator: {
//         externalId: '',
//         source: '',
//         tbName: '',
//         initiatorEmail: '',
//         initiatorID: '',
//     },
//     businessProcess: {
//         type: '',
//         category: '',
//     },
//     taskInfo: {
//         dealMembersNumber: 0,
//         client: {
//             firstName: '',
//             middleName: '',
//             lastName: '',
//         },
//         organization: {
//             orgname: '',
//         },
//         estateObjects: [],
//     },
//     clientManagerComment: '',
//     documentsInfo: [],
//     files: [],
//     addRealtyObjects: [],
//     requests: [],
// };

const initialState: FormState = {
    requests: [],
};

// const formReducer = (state = initialState, action: FormActionTypes): FormState => {
//     switch (action.type) {
//         case UPDATE_FORM_FIELD:
//             return {
//                 ...state,
//                 [action.payload.field]: action.payload.value,
//             };
//         case RESET_FORM:
//             return initialState;
//         case ADD_FILES:
//             return {
//                 ...state,
//                 files: [...state.files, ...action.payload],
//             };
//         case CREATE_REQUEST_SUCCESS:
//             return {
//                 ...state,
//                 requests: [...state.requests, action.payload]
//             }
//         case ADD_REALTY_OBJECT:
//             const newEstateObject = {
//                 objectType: action.payload.objectType,
//                 objectCost: action.payload.objectCost,
//                 tbObjectName: '',
//                 objectRegionCode: '',
//                 currency: '',
//             };
//             return {
//                 ...state,
//                 taskInfo: {
//                     ...state.taskInfo,
//                     estateObjects: [...state.taskInfo.estateObjects, newEstateObject],
//                 },
//             };
//         default:
//             return state;
//     }
// };

const formReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_REQUEST_SUCCESS:
            return {
                ...state,
                requests: [...state.requests, action.payload],
            };
        case ADD_REALTY_OBJECT:
            return {
                ...state,
                requests: state.requests.map((request) => {
                    if (request.taskInfo.estateObjects) {
                        return {
                            ...request,
                            taskInfo: {
                                ...request.taskInfo,
                                estateObjects: [...request.taskInfo.estateObjects, action.payload],
                            },
                        };
                    }
                    return request;
                }),
            };
        default:
            return state;
    }
};

export default formReducer;
