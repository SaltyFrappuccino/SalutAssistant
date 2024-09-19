export const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD'
export const RESET_FORM = 'RESET_FORM'
export const ADD_FILES = 'ADD_FILES'
export const ADD_REALTY_OBJECT = 'ADD_REALTY_OBJECT'
export const CREATE_REQUEST_SUCCESS = 'CREATE_REQUEST_SUCCESS'


interface UploadFormFieldAction {
    type: typeof UPDATE_FORM_FIELD;
    payload: {
        field: string;
        value: string;
    }
}

interface ResetFormAction {
    type: typeof RESET_FORM;
}

interface AddFilesAction {
    type: typeof ADD_FILES;
    payload: File[];
}

interface AddRealtyAction {
    type: typeof ADD_REALTY_OBJECT;
    payload: {
        objectType: string;
        objectCost: number;
        tbObjectName: string;
        objectRegionCode: string;
        currency: string;
    };
}

interface CreateRequestSuccessAction {
    type: typeof CREATE_REQUEST_SUCCESS;
    payload: {
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
            };
        };
    };
}

export type FormActionTypes = UploadFormFieldAction | ResetFormAction | AddFilesAction | AddRealtyAction | CreateRequestSuccessAction;

export const updateFormField = (field: string, value: string): UploadFormFieldAction => ({
    type: UPDATE_FORM_FIELD,
    payload: { field, value }
})

export const resetForm = (): FormActionTypes => ({
    type: RESET_FORM
})

export const addFiles = (files: File[]): AddFilesAction => ({
    type: ADD_FILES,
    payload: files
})

export const addRealtyObject = (objectType: string, objectCost: number, tbObjectName: string, objectRegionCode: string, currency: string): AddRealtyAction => {
    return {
        type: ADD_REALTY_OBJECT,
        payload: { objectType, objectCost, tbObjectName, objectRegionCode, currency }
    }
}

export function createRequestSuccess(requestData: any) {
    return {
        type: CREATE_REQUEST_SUCCESS,
        payload: requestData
    }
}