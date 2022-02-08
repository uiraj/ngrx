import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


import { IInvestorSubscriptionFormsState } from '../state/interface';
import {
    INVESTOR_SUBSCRIPTION_FORMS_EFFECTS, INVESTOR_SUBSCRIPTION_FORMS_REDUCERS, INVESTOR_SUBSCRIPTION_FORMS_STATE
} from '.';

export function getState(): IInvestorSubscriptionFormsState {
    return INVESTOR_SUBSCRIPTION_FORMS_STATE;
}

@NgModule({
    imports: [
        HttpClientModule,
        EffectsModule.forRoot(INVESTOR_SUBSCRIPTION_FORMS_EFFECTS),
        StoreModule.forRoot(INVESTOR_SUBSCRIPTION_FORMS_REDUCERS, { initialState: getState })
    ]
})
export class CoreModule { }

