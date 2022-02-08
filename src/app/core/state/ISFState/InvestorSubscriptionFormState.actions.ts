import { Action } from '@ngrx/store';
import { ISubscriptionFormConfigModel, ISubscriptionFormDetailsModel } from '@core/interfaces';
import { WorkflowType } from '@core/constants';



export const GET_FORM_DETAILS: string = 'GET_FORM_DETAILS';
export const GET_FORM_DETAILS_SUCCESS: string = 'GET_FORM_DETAILS_SUCCESS';
export const GET_FORM_DETAILS_FAILURE: string = 'GET_FORM_DETAILS_FAILURE';

export const GET_FORM_CONFIGURATION: string = 'GET_FORM_CONFIGURATION';
export const GET_FORM_CONFIGURATION_SUCCESS: string = 'GET_FORM_CONFIGURATION_SUCCESS';
export const GET_FORM_CONFIGURATION_FAILURE: string = 'GET_FORM_CONFIGURATION_FAILURE';

export const CHANGE_STATUS: string = 'CHANGE_STATUS';
export const CHANGE_STATUS_SUCCESS: string = 'CHANGE_STATUS_SUCCESS';
export const CHANGE_STATUS_FAILURE: string = 'CHANGE_STATUS_FAILURE';

export const SAVE_UNSAVED_CHANGES: string = 'SAVE_UNSAVED_CHANGES';

export class SaveUnsavedChanges implements Action {
    public readonly type: string = SAVE_UNSAVED_CHANGES;
}

export class GetFormConfiguration implements Action {
    public readonly type: string = GET_FORM_CONFIGURATION;
    constructor(public fundId: string, public workflowType: WorkflowType) {
    }
}

export class GetFormConfigurationSuccess implements Action {
    public readonly type: string = GET_FORM_CONFIGURATION_SUCCESS;
    constructor(public payload: ISubscriptionFormConfigModel) {
    }
}

export class GetFormConfigurationFailure implements Action {
    public readonly type: string = GET_FORM_CONFIGURATION_FAILURE;
    constructor(public error: string) {
    }
}


export class GetFormDetails implements Action {
    public readonly type: string = GET_FORM_DETAILS;
    constructor(public fundId: string, public workflowType: WorkflowType) {
    }
}

export class GetFormDetailsSuccess implements Action {
    public readonly type: string = GET_FORM_DETAILS_SUCCESS;
    constructor(public payload: ISubscriptionFormDetailsModel) {
    }
}

export class GetFormDetailsFailure implements Action {
    public readonly type: string = GET_FORM_DETAILS_FAILURE;
    constructor(public error: string) {
    }
}

export class ChangeStatus implements Action {
    public readonly type: string = CHANGE_STATUS;
    constructor(public payload: ISubscriptionFormDetailsModel) {
    }
}

export class ChangeStatusSuccess implements Action {
    public readonly type: string = CHANGE_STATUS_SUCCESS;
    constructor(public payload: ISubscriptionFormDetailsModel, public ppmId?:string) {
    }
}

export class ChangeStatusFailure implements Action {
    public readonly type: string = CHANGE_STATUS_FAILURE;
    constructor(public error: string) {
    }
}



export type Fetch = GetFormDetails | GetFormDetailsSuccess | GetFormDetailsFailure | GetFormConfiguration |GetFormConfigurationSuccess |GetFormConfigurationFailure;
export type StatusChange = ChangeStatus | ChangeStatusSuccess | ChangeStatusFailure;
export type Other = SaveUnsavedChanges;

export type All = Fetch & StatusChange & Other;
