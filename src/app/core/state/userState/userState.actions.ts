import { Action } from '@ngrx/store';
import { IUserDetailsModel, IFundDetailsModel, IClientDetails } from '@core/interfaces';


export const GET_USER_DETAILS: string = 'GET_USER_DETAILS';
export const GET_USER_DETAILS_SUCCESS: string = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_FAILURE: string = 'GET_USER_DETAILS_FAILURE';

export const GET_AVAILABLE_FUNDS: string = 'GET_AVAILABLE_FUNDS';
export const GET_AVAILABLE_FUNDS_SUCCESS: string = 'GET_AVAILABLE_FUNDS_SUCCESS';
export const GET_AVAILABLE_FUNDS_FAILURE: string = 'GET_AVAILABLE_FUNDS_FAILURE';

export const SAVE_USER_ACCOUNT_DETAILS: string = 'SAVE_USER_ACCOUNT_DETAILS';
export const SAVE_USER_ACCOUNT_DETAILS_SUCCESS: string = 'SAVE_USER_ACCOUNT_DETAILS_SUCCESS';
export const SAVE_USER_ACCOUNT_DETAILS_FAILURE: string = 'SAVE_USER_ACCOUNT_DETAILS_FAILURE';

export const GET_CLIENT_DETAILS: string = 'GET_CLIENT_DETAILS';
export const GET_CLIENT_DETAILS_SUCCESS: string = 'GET_CLIENT_DETAILS_SUCCESS';
export const GET_CLIENT_DETAILS_FAILURE: string = 'GET_CLIENT_DETAILS_FAILURE';

export const LOGOUT: string = 'LOGOUT';
export const LOGOUT_SUCCESS: string = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE: string = 'LOGOUT_FAILURE';

export class LogOut implements Action {
    public readonly type: string = LOGOUT;
}

export class LogOutSuccess implements Action {
    public readonly type: string = LOGOUT_SUCCESS;
}

export class LogOutFailure implements Action {
    public readonly type: string = LOGOUT_FAILURE;
}

export class GetUserDetails implements Action {
    public readonly type: string = GET_USER_DETAILS;
}

export class GetUserDetailsSuccess implements Action {
    public readonly type: string = GET_USER_DETAILS_SUCCESS;
    constructor(public payload: IUserDetailsModel) {
    }
}

export class GetUserDetailsFailure implements Action {
    public readonly type: string = GET_USER_DETAILS_FAILURE;
    constructor(public error: string) {}
}

export class GetClientDetails implements Action {
    public readonly type: string = GET_CLIENT_DETAILS;
}

export class GetClientDetailsSuccess implements Action {
    public readonly type: string = GET_CLIENT_DETAILS_SUCCESS;
    constructor(public payload: IClientDetails) {
    }
}

export class GetClientDetailsFailure implements Action {
    public readonly type: string = GET_CLIENT_DETAILS_FAILURE;
    constructor(public error: string) {}
}

export class GetAvailableFundDetails implements Action {
    public readonly type: string = GET_AVAILABLE_FUNDS;
}

export class GetAvailableFundDetailsSuccess implements Action {
    public readonly type: string = GET_AVAILABLE_FUNDS_SUCCESS;
    constructor(public payload: IFundDetailsModel[]) {
    }
}

export class GetAvailableFundDetailsFailure implements Action {
    public readonly type: string = GET_AVAILABLE_FUNDS_FAILURE;
    constructor(public error: string) {
    }
}

export class SaveUserAccountDetails implements Action {
    public readonly type: string = SAVE_USER_ACCOUNT_DETAILS;
    constructor(public payload: IUserDetailsModel) {
    }
}

export class SaveUserAccountDetailsSuccess implements Action {
    public readonly type: string = SAVE_USER_ACCOUNT_DETAILS_SUCCESS;
    constructor(public payload: IUserDetailsModel) {
    }
}

export class SaveUserAccountDetailsFailure implements Action {
    public readonly type: string = SAVE_USER_ACCOUNT_DETAILS_FAILURE;
    constructor(public error: string) {
    }
}

export type Fetch = GetUserDetails | GetUserDetailsSuccess | GetUserDetailsFailure | GetAvailableFundDetails
| GetAvailableFundDetailsSuccess | GetAvailableFundDetailsFailure | GetClientDetails | GetClientDetailsSuccess | GetClientDetailsFailure;

export type Other = LogOut | LogOutSuccess | LogOutFailure;

export type Save =  SaveUserAccountDetails | SaveUserAccountDetailsSuccess| SaveUserAccountDetailsFailure;

export type All = Fetch & Save & Other;