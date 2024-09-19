interface EstateObject {
    objectType: string;
    objectCost: string | number;
    tbObjectName?: number;
    objectRegionCode?: string;
    currency?: string;
}

interface Client {
    firstName: string;
    middleName: string;
    lastName: string;
}

interface Organization {
    orgname: string;
}

interface TaskInfo {
    dealMembersNumber: number;
    client: Client;
    organization: Organization;
    estateObjects: EstateObject[];
}

interface TaskInitiator {
    externalId: string;
    source: string;
    tbName: string;
    initiatorEmail: string;
    initiatorID: string;
}

interface BusinessProcess {
    type: string;
    category: string;
}

interface DocumentInfo {
    otrId: string;
    fileName: string;
}

interface FormState {
    taskInitiator: TaskInitiator;
    businessProcess: BusinessProcess;
    taskInfo: TaskInfo;
    clientManagerComment: string;
    documentsInfo: DocumentInfo[];
}