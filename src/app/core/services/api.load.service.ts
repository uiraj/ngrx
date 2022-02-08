import { Injectable } from '@angular/core';
import * as UserActions from '@core/state/userState';
import { IInvestorSubscriptionFormsState } from '../interfaces';
import { Store } from '@ngrx/store';


@Injectable({
    providedIn: 'root'
})
export class AppLoadService {
    constructor(private store: Store<IInvestorSubscriptionFormsState>) { }

    public getUserDetails(): void {
        this.store.dispatch(new UserActions.GetUserDetails());
    }

    public getClientDetails(): void {
        this.store.dispatch(new UserActions.GetClientDetails());
    }

}