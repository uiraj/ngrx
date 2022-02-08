import { Injectable } from '@angular/core';
import {
    IUserDetailsModel, IFundDetailsModel, IClientDetails} from '@core/interfaces';
import { Action } from '@ngrx/store';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as ISFStateActions from './userState.actions';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';



@Injectable()
export class UserEffects {

    @Effect() public getUserDetails$: Observable<Action> = this.actions.pipe(
        ofType<ISFStateActions.Fetch>(ISFStateActions.GET_USER_DETAILS),
        switchMap(() => {
            return this.apiService.getUserDetails().pipe(
                map((response: IUserDetailsModel) => {
                    return new ISFStateActions.GetUserDetailsSuccess(response);
                }),
                catchError((e: string) => {
                    return of(new ISFStateActions.GetUserDetailsFailure(e));
                })
            );
        })
    );
    @Effect() public GetAvailableFundDetails$: Observable<Action> = this.actions.pipe(
        ofType<ISFStateActions.Fetch>(ISFStateActions.GET_AVAILABLE_FUNDS),
        switchMap(() => {
            return this.apiService.GetAvailableFundDetails().pipe(
                map((response: IFundDetailsModel[]) => {
                    return new ISFStateActions.GetAvailableFundDetailsSuccess(response);
                }),
                catchError((e: string) => {

                    return of(new ISFStateActions.GetAvailableFundDetailsFailure(e));
                })
            );
        })
    );

    @Effect() public getClientDetails$: Observable<Action> = this.actions.pipe(
        ofType<ISFStateActions.Fetch>(ISFStateActions.GET_CLIENT_DETAILS),
        switchMap(() => {
            return this.apiService.getInvestorClientDetails().pipe(
                map((response: IClientDetails) => {
                    return new ISFStateActions.GetClientDetailsSuccess(response);
                }),
                catchError((e: string) => {
                    return of(new ISFStateActions.GetClientDetailsFailure(e));
                })
            );
        })
    );

    @Effect() public saveUserAccountDetails$: Observable<Action> = this.actions.pipe(
        ofType<ISFStateActions.Fetch>(ISFStateActions.SAVE_USER_ACCOUNT_DETAILS),
        map((action: ISFStateActions.SaveUserAccountDetails) => action.payload),
        switchMap((payload: IUserDetailsModel) => {
            return this.apiService.saveUserAccountDetails(payload).pipe(
                map(() => {
                    this.snackBar.open('Successfully Saved', 'Close', { duration: 3000, panelClass: ['mat-snack-bar', 'success'] });
                    return new ISFStateActions.SaveUserAccountDetailsSuccess(payload);
                }),
                catchError((e: string) => {
                    return of(new ISFStateActions.SaveUserAccountDetailsFailure(e));
                })
            );
        })
    );

    @Effect() public logOut$: Observable<Action> = this.actions.pipe(
        ofType<ISFStateActions.Other>(ISFStateActions.LOGOUT),
        map(() => {
            window.location.replace(`${environment.apiBase}/Login/Logout`);
            return new ISFStateActions.LogOutSuccess();
        })
    );
    constructor(
        private apiService: ApiService, private snackBar: MatSnackBar, private actions: Actions) {
    }
}
