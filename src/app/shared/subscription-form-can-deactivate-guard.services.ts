import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { SatoriOneEntityFormComponent } from '../investor-subscription-forms/satori-one-entity-form/satori-one-entity-form.component';
import { SatoriOnePersonFormComponent } from '../investor-subscription-forms/satori-one-person-form/satori-one-person-form.component';
import { SatoriTwoEntityFormComponent  } from '../investor-subscription-forms/satory-two-entity-form/satori-two-entity-form.component';
import { SatoriTwoPersonFormComponent  } from '../investor-subscription-forms/satori-two-person-form/satori-two-person-form.component';
import { SatoriLtdUstaxExemptComponent } from '@app/investor-subscription-forms/satori-ltd-ustax-exempt/satori-ltd-ustax-exempt.component';
import { SatoriLtdForeignInvestorFormComponent } from '@app/investor-subscription-forms/satori-ltd-foreign-investor-form/satori-ltd-foreign-investor-form.component';


@Injectable({
    providedIn: 'root'
  })
export class SubscriptionFormCanDeactivateGuard implements CanDeactivate<SatoriOneEntityFormComponent | SatoriOnePersonFormComponent | SatoriTwoEntityFormComponent | SatoriTwoPersonFormComponent | SatoriLtdUstaxExemptComponent| SatoriLtdForeignInvestorFormComponent> {

  public canDeactivate(
    component: SatoriOneEntityFormComponent | SatoriOnePersonFormComponent | SatoriTwoEntityFormComponent | SatoriTwoPersonFormComponent |SatoriLtdUstaxExemptComponent |SatoriLtdForeignInvestorFormComponent
  ): boolean{
    if (component.subscriptionForm && component.subscriptionForm.dirty) {
        return confirm('Are you sure you want to leave this page? Any unsaved changes will be lost.');
    }
    return true;
  }
}