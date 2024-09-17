import { UPDATE_FORM_FIELD, RESET_FORM, FormActionTypes } from '../action/formActions';

interface FormSettlement {
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
    files: File[];
    addRealtyObjects: {objectType: string, objectCost: string}[],
}

const initialState: FormSettlement = {
    taskInitiator: {
        externalId: '',
        source: '',
        tbName: '',
        initiatorEmail: '',
        initiatorID: '',
    },
    businessProcess: {
        type: '',
        category: '',
    },
    taskInfo: {
        dealMembersNumber: 0,
        client: {
            firstName: '',
            middleName: '',
            lastName: '',
        },
        organization: {
            orgname: '',
        },
        estateObjects: [],
    },
    clientManagerComment: '',
    documentsInfo: [],
    files: [],
    addRealtyObjects: [],
};

const formSettlement = (state = initialState, action: FormActionTypes): FormSettlement => {
    switch (action.type) {
        case UPDATE_FORM_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };
        case RESET_FORM:
            return initialState;
        default:
            return state;
    }
};

export default formSettlement;
