import { Injectable } from '@angular/core';
import { IChangeStatusResponceModel, ISubscriptionFormConfigModel, ISubscriptionFormDetailsModel } from '@app/core/interfaces';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ApiService } from '@app/core/services/api.service';
import * as SubscriptionFormStateActions from './investorSubscriptionFormState.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkflowType } from '@app/core/constants';


@Injectable()
export class InvestorSubscriptionFormEffects {

    @Effect() public getFormDetails$: Observable<Action> = this.actions.pipe(
        ofType<SubscriptionFormStateActions.Fetch>(SubscriptionFormStateActions.GET_FORM_DETAILS),
        switchMap((action: SubscriptionFormStateActions.GetFormDetails) => {
            return this.apiService.getFundDetails(action.fundId, action.workflowType).pipe(
                map((response: ISubscriptionFormDetailsModel) => {
                    return new SubscriptionFormStateActions.GetFormDetailsSuccess(response);
                }),
                catchError((e: string) => {
                    return of(new SubscriptionFormStateActions.GetFormDetailsFailure(e));
                })
            );
        })
    );

    @Effect() public GetFormConfiguration$: Observable<Action> = this.actions.pipe(
        ofType<SubscriptionFormStateActions.Fetch>(SubscriptionFormStateActions.GET_FORM_CONFIGURATION),
        switchMap((action: SubscriptionFormStateActions.GetFormConfiguration) => {
            return this.apiService.getFundConfiguration(action.fundId, action.workflowType).pipe(
                map((response: ISubscriptionFormConfigModel) => {
                    return new SubscriptionFormStateActions.GetFormConfigurationSuccess(response);
                }),
                catchError((e: string) => {
                    return of(new SubscriptionFormStateActions.GetFormConfigurationFailure(e));
                })
            );
        })
    );

    @Effect() public changeStatus$: Observable<Action> = this.actions.pipe(
        ofType<SubscriptionFormStateActions.StatusChange>(SubscriptionFormStateActions.CHANGE_STATUS),
        map((action: SubscriptionFormStateActions.ChangeStatus) => action.payload),
        switchMap((payload: ISubscriptionFormDetailsModel) => {
            return this.apiService.changeStatus(payload).pipe(
                map((fundObj:IChangeStatusResponceModel) => {
                    return new SubscriptionFormStateActions.ChangeStatusSuccess(payload, fundObj.ppmId);
                }),
                catchError((e: string) => {
                    return of(new SubscriptionFormStateActions.ChangeStatusFailure(e));
                })
            );
        })
    );

    constructor(
        private apiService: ApiService, private actions: Actions, private snackBar: MatSnackBar) {
    }
}