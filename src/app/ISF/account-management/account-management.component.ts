import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISFState, IUserDetailsModel, IUserInformation } from '@app/core/interfaces';
import { Store, ActionsSubject } from '@ngrx/store';
import * as ISFStateActions from '@core/state/userState/userState.actions';
import { Subscription } from 'rxjs';
import { UserState } from '@app/core/state/userState/userState.model';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit, OnDestroy {

  public accountDetailsForm: FormGroup;
  public accreditedInvestors: string[] = ['Yes', 'No'];
  public hedgeFunds: string[] = ['Yes', 'No'];
  public usTaxExempts: string[] = ['Yes', 'No'];
  public foreignInvestors: string[] = ['Yes', 'No'];
  public qualifiedPurchasers: string[] = ['Yes', 'No'];
  public portfolios: string[] = ['<$1 million', '$1 - 5 million', '$6 - 10 million', '$11 - 50 million', '$50 - 100 million', '>$100 million'];
  public hedgeFundPortfolios: string[] = ['<$1 million', '$1 - 5 million', '$6 - 10 million', '$11 - 25 million', '$26 - 50 million', '>$50 million'];
  public investorSubscriptionFormStateSubscription: Subscription;
  public userState: UserState;
  public actionSubscription: Subscription;
  public email: string;

  constructor(private store: Store<ISFState>, private fb: FormBuilder) {
  }
  public ngOnInit(): void {
    this.accountDetailsForm = this.fb.group({
      firstName: this.fb.control(undefined),
      lastName: this.fb.control(undefined),
      phone: this.fb.control('', [Validators.pattern('^[0-9]{10,12}$')]),
      email: this.fb.control(undefined),
      company: this.fb.control(undefined),
      address1: this.fb.control(undefined),
      address2: this.fb.control(undefined),
      city: this.fb.control(undefined),
      state: this.fb.control(undefined),
      zipCode: this.fb.control(undefined),
      country: this.fb.control(undefined),
      investorType: this.fb.control(undefined),
      usTaxExempt: this.fb.control(undefined),
      foreignInvestor: this.fb.control(undefined),
      qualifiedPurchaser: this.fb.control(undefined),
      hedgeFunds: this.fb.control(undefined),
      accreditedInvestor: this.fb.control(undefined),
      portfolio: this.fb.control(undefined),
      hedgeFundPortfolio: this.fb.control(undefined)
    });

    //disabling email 
    this.accountDetailsForm.controls['email'].disable();

    this.investorSubscriptionFormStateSubscription = this.store.select('userState').subscribe((investordashboard: UserState) => {
      this.userState = investordashboard;
      if (this.userState.userDetails) {
        this.accountDetailsForm.patchValue({ email: this.userState.userDetails.email });
      }
      if (this.userState.userDetails && this.userState.userDetails.investorInfo) {

        this.editUserFormDetails(this.userState.userDetails.investorInfo);
      }
    });
  }

  public radioChangeForForigenInvestor(event: MatRadioChange): void {
    if (event.value === 'Yes') {
      this.accountDetailsForm.controls['foreignInvestor'].disable();
    } else if (event.value === 'No') {
      this.accountDetailsForm.controls['foreignInvestor'].enable();
    }
  }
  public radioChangeForUsTaxExecmpt(e: MatRadioChange): void {
    if (e.value === 'Yes') {
      this.accountDetailsForm.controls['usTaxExempt'].disable();
    } else if (e.value === 'No') {
      this.accountDetailsForm.controls['usTaxExempt'].enable();
    }
  }

  public radioChangeForQualifiedPurchaser(e: MatRadioChange): void {
    if (e.value === 'Yes') {
      this.accountDetailsForm.controls['accreditedInvestor'].setValue('Yes');
      this.accountDetailsForm.controls['accreditedInvestor'].disable();
    } else if (e.value === 'No') {
      this.accountDetailsForm.controls['accreditedInvestor'].enable();
    }
  }

  public editUserFormDetails(data: IUserInformation): void {
    this.accountDetailsForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      company: data.company,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
      investorType: data.investorType,
      usTaxExempt: data.usTaxExempt,
      foreignInvestor: data.foreignInvestor,
      qualifiedPurchaser: data.qualifiedPurchaser,
      hedgeFunds: data.hedgeFunds,
      accreditedInvestor: data.accreditedInvestor,
      portfolio: data.portfolio,
      hedgeFundPortfolio: data.hedgeFundPortfolio
    });
    this.radioChangeForQualifiedPurchaser({ value: data.qualifiedPurchaser } as MatRadioChange);
    this.radioChangeForUsTaxExecmpt({ value: data.foreignInvestor } as MatRadioChange);
    this.radioChangeForForigenInvestor({ value: data.usTaxExempt } as MatRadioChange);
  }

  public saveUserAccountInfo(): void {
    // enable all fields, because disabled fields have thier values set to null
    for (const control of Object.keys(this.accountDetailsForm.controls)) {
      this.accountDetailsForm.controls[control].enable();
    }
    const saveAccountDetails: IUserDetailsModel = {
      role: this.userState.userDetails.role,
      userId: this.userState.userDetails.userId,
      investorId: this.userState.userDetails.investorId,
      email: this.userState.userDetails.email,
      investorInfo: this.accountDetailsForm.value
    };
    this.store.dispatch(new ISFStateActions.SaveUserAccountDetails(saveAccountDetails));

  }
  public revertChanges(): void {
    this.editUserFormDetails(this.userState.userDetails.investorInfo);
    this.accountDetailsForm.markAsPristine();
  }
  public ngOnDestroy(): void {
    this.investorSubscriptionFormStateSubscription.unsubscribe();
  }
}
