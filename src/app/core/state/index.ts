import { Type } from '@angular/core';
import { IInvestorSubscriptionFormsState } from '@core/interfaces';
import { ActionReducerMap } from '@ngrx/store';
import {UserState,
    UserEffects,
    userReducer
} from './userState';
import {
    InvestorSubscriptionFormEffects,
    InvestorSubscriptionFormReducer,InvestorSubscriptionFormState
} from './investorSubscriptionFormState';


export const INVESTOR_SUBSCRIPTION_FORMS_EFFECTS: Type<any>[] = [
    UserEffects,
    InvestorSubscriptionFormEffects,
];

export const INVESTOR_SUBSCRIPTION_FORMS_REDUCERS: ActionReducerMap<IInvestorSubscriptionFormsState> = {
    userState: userReducer,
    subscriptionFormState: InvestorSubscriptionFormReducer,
};

export const INVESTOR_SUBSCRIPTION_FORMS_STATE: IInvestorSubscriptionFormsState = {
    userState: new UserState(undefined),
    subscriptionFormState: new InvestorSubscriptionFormState(undefined)
};