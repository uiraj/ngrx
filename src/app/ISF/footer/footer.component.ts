import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserState } from '@core/state/userState';
import { ISFState } from '@core/interfaces';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as UserDetailsActions from '@core/state/userState/userState.actions';
import * as SubscriptionFormStateActions from '@core/state/investorSubscriptionFormState';
import { InvestorSubscriptionFormState } from '@core/state/investorSubscriptionFormState';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  public userSubscription: Subscription;
  public userState: UserState;

  constructor(private store: Store<ISFState>) {
  }

  public ngOnInit(): void {
    this.userSubscription = this.store.select('userState').subscribe((userState: UserState) => {
      this.userState = userState;
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
