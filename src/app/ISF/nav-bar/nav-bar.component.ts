import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserState } from '@core/state/userState';
import { IClientDetails, ISFState } from '@core/interfaces';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as UserDetailsActions from '@core/state/userState/userState.actions';
import * as SubscriptionFormStateActions from '@core/state/investorSubscriptionFormState';
import { InvestorSubscriptionFormState } from '@core/state/investorSubscriptionFormState';
import { environment } from '@env/environment';

const SCREEN_NAMES = {
  HOME: 'STP Fund Network - STP Investment Partners - Advisor to the Satori Funds',
  ACCOUNT: 'Investor Information',
  SUBSCRIPTIONFORM: 'Subscription Form'
};

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  public userRoleSubscription: Subscription;
  public userActionsSubscription: Subscription;
  public subscriptionFormSubscription: Subscription;
  public subscriptionFormActionsSubscription: Subscription;
  public userState: UserState;
  public subscriptionFormState: InvestorSubscriptionFormState;
  public userRole: string;
  public screenName: string;
  public apiBase: string;
  public availableClients : IClientDetails;

  private routerEventSubscription: Subscription;
  private isLogOutClicked: boolean;
  constructor(private store: Store<ISFState>, private router: Router, private actionsSubject: ActionsSubject, private dialog: MatDialog) {
    this.screenName = SCREEN_NAMES.HOME;
    this.apiBase = environment.apiBase;
  }

  public ngOnInit(): void {
    this.userRoleSubscription = this.store.select('userState').subscribe((userState: UserState) => {
      this.userState = userState;
      if (this.userState && this.userState.clientDetails) {
          this.availableClients = this.userState.clientDetails;
        }
    });

    this.subscriptionFormSubscription = this.store.select('subscriptionFormState')
      .subscribe((subscriptionFormState: InvestorSubscriptionFormState) => {
        this.subscriptionFormState = subscriptionFormState;
      });

    this.userActionsSubscription = this.actionsSubject.subscribe((userActions: UserDetailsActions.All) => {
      if (userActions.type === 'GET_USER_DETAILS_SUCCESS') {
        const userDetailsSuccessAction: UserDetailsActions.GetUserDetailsSuccess = userActions as UserDetailsActions.GetUserDetailsSuccess;
        if (userDetailsSuccessAction.payload && userDetailsSuccessAction.payload.investorInfo) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/investor-information']);
        }
      } else if (userActions.type === 'SAVE_USER_ACCOUNT_DETAILS_SUCCESS') {
        this.router.navigate(['/home']);
      }
    });

    this.subscriptionFormActionsSubscription = this.actionsSubject.subscribe((satoriFormActions: SubscriptionFormStateActions.All) => {
      if (satoriFormActions.type === 'CHANGE_STATUS_SUCCESS' && this.isLogOutClicked === true) {
        this.store.dispatch(new UserDetailsActions.LogOut());
      }
    });
    this.routerEventSubscription = this.router.events.subscribe((val: NavigationEnd) => {
      if (val instanceof NavigationEnd) {
        if (this.router.url.includes('home')) {
          this.screenName = SCREEN_NAMES.HOME;
        } else if (this.router.url.includes('investor-information')) {
          this.screenName = SCREEN_NAMES.ACCOUNT;
        } else {
          this.screenName = SCREEN_NAMES.SUBSCRIPTIONFORM;
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.userRoleSubscription.unsubscribe();
    this.userActionsSubscription.unsubscribe();
    this.subscriptionFormActionsSubscription.unsubscribe();
    this.subscriptionFormSubscription.unsubscribe();
    this.routerEventSubscription.unsubscribe();
  }

  public logOut(): void {
    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '300px',
      hasBackdrop: true,
      data: {
        title: 'Confirm Action',
        message: 'Are you sure you want to log out?',
        confirmBtnText: 'Log Out',
        cancelBtnText: 'Cancel',
        showCancelBtn: true
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((dialogResult: boolean) => {
      if (dialogResult) {
        if (this.subscriptionFormState.subscriptionFormDetails && this.router.url.includes('/subscription-form/') && this.subscriptionFormState.subscriptionFormDetails.isFormTouched) {
          if (confirm('Would you like to save your unsaved changes?')) {
            this.isLogOutClicked = true;
            this.store.dispatch(new SubscriptionFormStateActions.SaveUnsavedChanges());
          }else{
            this.store.dispatch(new UserDetailsActions.LogOut());
          }
        } else {
          this.store.dispatch(new UserDetailsActions.LogOut());
        }
      }
    });
  }
}
