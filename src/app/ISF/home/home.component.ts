import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store , ActionsSubject} from '@ngrx/store';
import { ISFState, IFundDetailsModel, IUserDetailsModel, ISubscriptionFormDetailsModel, StatusModel } from '@core/interfaces';
import { WorkflowType } from '@core/constants';
import * as UserActions from '@core/state/userState';
import * as SubscriptionFormActions from '@core/state/investorSubscriptionFormState';
import { UserState } from '@core/state/userState';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@env/environment';
import { ApiService } from '../../core/services/api.service';
import * as SubscriptionFormStateActions from '@core/state/investorSubscriptionFormState';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public fundSubscription: Subscription;
  public fundActionsSubscription: Subscription;
  private subscriptionFormAction:Subscription
  public availableFunds: IFundDetailsModel[];
  public emailStateSubscription: Subscription;
  public investorInformation: IUserDetailsModel;
  public addMessage: string;
  public apiBase: string;
  public status: string;
  public selectedIndex: string[];
  public loadingPPM: string[];
  public loadingFund: boolean;
  public clientId: string;  
  public workFlowType: string;

  constructor(private store: Store<ISFState>, 
    private router: Router, 
    private dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private actionsSubject: ActionsSubject) {
    this.apiBase = environment.apiBase;
    this.loadingPPM = [];
    this.loadingFund = true;
  }

  public ngOnInit(): void {
    this.store.dispatch(new UserActions.GetAvailableFundDetails());
    this.fundSubscription = this.store.select('userState').subscribe((userState: UserState) => {
      if (userState.fundDetails) {
        this.availableFunds = (userState.fundDetails || []).slice();
        this.investorInformation = userState.userDetails;
      }
      if(userState.clientDetails){
        this.clientId = userState.clientDetails.clientId;
        }

    });

    this.subscriptionFormAction = this.actionsSubject.subscribe((subscriptionFormAction: SubscriptionFormStateActions.All) => {
      if (subscriptionFormAction.type === 'CHANGE_STATUS_SUCCESS') {
        const saveChangesAction: SubscriptionFormStateActions.ChangeStatusSuccess =
          subscriptionFormAction as SubscriptionFormStateActions.ChangeStatusSuccess;
        this.workFlowType = saveChangesAction.payload.workflowType;
        this.getSnackBar();
      } else if (subscriptionFormAction.type === 'CHANGE_STATUS_FAILURE') {
        this.snackBar.open('Redemption request failed!, please try again.', 'Close', { duration: 3000, panelClass: ['mat-snack-bar', 'error'] }
        );
      }
    }
    );
  }
  public selectStep(status: StatusModel): number {
    if (status.NEWINV === undefined) {
      return 0;
    }
    if (status.NEWINV === 'Subscription Form In Progress' || status.ADDINV === 'Subscription Form In Progress' || (this.clientId === 'STPIP' ? false : (status.RDMINV === 'Subscription Form In Progress'))) {
      return 1;

    } else if (status.NEWINV === 'Pending Investor Signature' || status.ADDINV === 'Pending Investor Signature' || (this.clientId === 'STPIP' ? false : (status.RDMINV === 'Pending Investor Signature'))) {
      return 2;

    } else if ( status.NEWINV === 'Pending Admin Signature' || status.ADDINV === 'Pending Admin Signature' || (this.clientId === 'STPIP' ? false : (status.RDMINV === 'Pending Admin Signature'))) {
      return 3;
    
    } else {
      if (this.clientId === 'STPIP') {
        if ((status.NEWINV === 'Completed' && !status.ADDINV) || (status.NEWINV === 'Completed' && status.ADDINV === 'Completed')) {
          return 5;
        }
      } else {
        if ((status.NEWINV === 'Completed' && !status.ADDINV && !status.RDMINV) || 
        (status.NEWINV === 'Completed' && status.ADDINV === 'Completed' && !status.RDMINV) || 
        (status.NEWINV === 'Completed' && status.RDMINV === 'Completed' && !status.ADDINV) ||
        (status.NEWINV === 'Completed' && status.ADDINV === 'Completed' && status.RDMINV === 'Completed')) {
          return 5;
        }
      }
    }
  }

  public stepUpdate(availableFund: IFundDetailsModel, status: string): boolean {
    if (availableFund.status && (availableFund.status.NEWINV === status || availableFund.status.ADDINV === status || (this.clientId != 'STPIP' && availableFund.status.RDMINV === status))) {
      return true;
    }

  }

  public statusUpdate(availableFund: IFundDetailsModel, status: string): boolean {
    if (this.clientId === 'STPIP') {
      return (availableFund.status && ((availableFund.status.NEWINV === status && !availableFund.status.ADDINV) ||
        (availableFund.status.NEWINV === status && availableFund.status.ADDINV === status)));
    } else {
      return (availableFund.status && ((availableFund.status.NEWINV === status && !availableFund.status.ADDINV && !availableFund.status.RDMINV) ||
        (availableFund.status.NEWINV === status && availableFund.status.ADDINV === status && !availableFund.status.RDMINV) ||
        (availableFund.status.NEWINV === status && availableFund.status.RDMINV === status && !availableFund.status.ADDINV) ||
        (availableFund.status.NEWINV === status && availableFund.status.ADDINV === status && availableFund.status.RDMINV === status)));
    }
  }


  public getSnackBar(): void {
    if (this.clientId === 'STPIP' && this.workFlowType === 'RDMINV') {
      this.snackBar.open('Redemption request successfull, admin will contact you shortly.', 'Close', { duration: 5000, panelClass: ['mat-snack-bar', 'success'] }
      );
    }
  }


  public investFund(fund: IFundDetailsModel, fundType?: string): void {
    if ((fund.status && fund.status.NEWINV === 'Completed') && fundType === 'add') {
      this.addMessage = `add an additional investment?`;
    } else if (fund.status && fund.status.NEWINV === 'Completed' && fundType === 'redeem') {
      this.addMessage = `refund an investment?`;
    } else {
      this.addMessage = `invest?`;
    }
    const message: string = `Are you sure you want to ` + this.addMessage;
    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        title: 'Confirm Action',
        message,
        confirmBtnText: 'Yes',
        cancelBtnText: 'No',
        showCancelBtn: true,
      },
    }
    );
    dialogRef.afterClosed().subscribe((dialogResult: boolean) => {
      if (dialogResult) {
        let workflowType: WorkflowType = WorkflowType.NEW;
        if (fundType === 'add') {
          workflowType = WorkflowType.ADD;
        } else if (fundType === 'redeem') {
          workflowType = WorkflowType.REDEEM;
        }
        if (workflowType === WorkflowType.NEW && fund.status && !fund.status.NEWINV) {
          this.snackBar.open('PPM documents have been sent to your email.', 'Close', { duration: 5000, panelClass: ['mat-snack-bar', 'success'] });
        }
        this.store.dispatch(new SubscriptionFormActions.ChangeStatus({
          fundId: fund.fundId,
          ppmApproved: false,
          isFormSubmitted: false,
          isFormTouched:false,
          workflowType
        } as ISubscriptionFormDetailsModel));
        if (workflowType === WorkflowType.NEW) {
          if(fund.fundName.includes('TimesSquare')){
            this.router.navigate(['subscription-form',"subscription", fund.fundId, workflowType]);
          }else{
            this.router.navigate(['subscription-form', this.getFundURL(fund), fund.fundId]);
          }
          
        }else if (workflowType === WorkflowType.ADD) {
          if(fund.fundName.includes('TimesSquare')){
            this.router.navigate(['subscription-form', 'subscription', fund.fundId, workflowType]);
          }else{
            this.router.navigate(['additional-subscription-form', 'satori-additional-subscription', fund.fundId]);
          }
        } else if (workflowType === WorkflowType.REDEEM) {
          if (fund.fundName.includes('TimesSquare')) {
            this.router.navigate(['subscription-form', 'subscription', fund.fundId, workflowType]);
          }
        }
      }
    });
  }

  public goToSubscriptionForm(fund: IFundDetailsModel): void {
    if(fund.status && fund.status.NEWINV === 'Subscription Form In Progress'){
      if(fund.fundName.includes('TimesSquare')){
        this.router.navigate(['subscription-form',"subscription", fund.fundId, WorkflowType.NEW]);
      }else{
        this.router.navigate(['subscription-form', this.getFundURL(fund), fund.fundId]);
      }
    }else if(fund.status && fund.status.ADDINV === 'Subscription Form In Progress'){
      if(fund.fundName.includes('TimesSquare')){
        this.router.navigate(['subscription-form', 'subscription', fund.fundId, WorkflowType.ADD]);
      }else{
        this.router.navigate(['additional-subscription-form', 'satori-additional-subscription', fund.fundId]);
      }
    } else if (fund.status && fund.status.RDMINV === 'Subscription Form In Progress') {
      if (fund.fundName.includes('TimesSquare')) {
        this.router.navigate(['subscription-form','subscription',fund.fundId,WorkflowType.REDEEM]);
      }
    }
  }

  public getFundURL(fund: IFundDetailsModel): string {
    
    switch (fund.fundName) {
      case 'TimesSquare Global Health Care Fund, LP':
      case 'TimesSquare Global Health Care Fund Ltd. (Non-US)':
      case 'TimesSquare Global Health Care Fund Ltd. (USTE)':
      case 'TimesSquare International Micro Cap Fund, LP':
      case 'TimesSquare Strategic Investment Fund, LP':
      case 'TimesSquare Focus Fund, LP':        
        return 'subscription'
      case 'Satori I':
        return this.investorInformation.investorInfo.investorType === 'Entity' ? 'satori-one-entity' : 'satori-one-person';
      case 'Satori II':
        return this.investorInformation.investorInfo.investorType === 'Entity' ? 'satori-two-entity' : 'satori-two-person';
      case 'Satori Ltd':
        return this.investorInformation.investorInfo.usTaxExempt === 'Yes' ? 'satori-ltd-us-tax-exempt' : 'satori-ltd-foreign-investors';
      default:
        return 'satori-one-person';
    }
  }
  public getDownloadString(availableFund: IFundDetailsModel) {
    this.loadingPPM.push(availableFund.ppmId);
    this.apiService.getBase64ForPPMDownload(availableFund.ppmId).subscribe((response: string) => {
      const a = document.createElement('a');
      a.href = `data:application/pdf;base64,${response}`;
      a.download = availableFund.ppmId;
      a.click();
      a.remove();
      this.loadingPPM.splice(this.loadingPPM.findIndex((id: string) => availableFund.ppmId === id), 1);
    });
  }
  public ngOnDestroy(): void {
    this.fundSubscription.unsubscribe();
    this.subscriptionFormAction.unsubscribe();
  }
}
