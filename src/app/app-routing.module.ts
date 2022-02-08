import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagementComponent } from './investor-subscription-forms/account-management/account-management.component';
import { SatoriOneEntityFormComponent } from './investor-subscription-forms/satori-one-entity-form/satori-one-entity-form.component';
import { SatoriTwoPersonFormComponent } from './investor-subscription-forms/satori-two-person-form/satori-two-person-form.component';
import { HomeComponent } from './investor-subscription-forms/home/home.component';
import { AuthHomeGuard } from './core/services/auth.guard';
import { SatoriTwoEntityFormComponent } from './investor-subscription-forms/satory-two-entity-form/satori-two-entity-form.component';
import { SatoriOnePersonFormComponent } from './investor-subscription-forms/satori-one-person-form/satori-one-person-form.component';
import { BaseComponent } from './investor-subscription-forms/base/base.component';
import { SubscriptionFormCanDeactivateGuard } from './shared/subscription-form-can-deactivate-guard.service';
import { SatoriLtdUstaxExemptComponent } from './investor-subscription-forms/satori-ltd-ustax-exempt/satori-ltd-ustax-exempt.component';
import { SatoriLtdForeignInvestorFormComponent } from './investor-subscription-forms/satori-ltd-foreign-investor-form/satori-ltd-foreign-investor-form.component';
import { SatoriAdditionalSubscriptionComponent } from './investor-subscription-forms/satori-additional-subscription/satori-additional-subscription.component';
import { SubscriptionFormComponent } from './investor-subscription-forms/subscription-form/subscription-form.component'
import { ClientRouteCheckAuthHomeGuard } from './shared/clientRouteCheck.guard';
const routes: Routes = [
  {
    path: 'subscription-form', children: [
      {
        path: 'satori-one-entity/:id',
        component: SatoriOneEntityFormComponent,
        canDeactivate: [SubscriptionFormCanDeactivateGuard]
      },
      {
        path: 'satori-one-person/:id',
        component: SatoriOnePersonFormComponent,
        canDeactivate: [SubscriptionFormCanDeactivateGuard]
      },
      {
        path: 'satori-two-entity/:id',
        component: SatoriTwoEntityFormComponent,
        canDeactivate: [SubscriptionFormCanDeactivateGuard]
      },
      {
        path: 'satori-two-person/:id',
        component: SatoriTwoPersonFormComponent,
        canDeactivate: [SubscriptionFormCanDeactivateGuard]
      }
      , {
        path: 'satori-ltd-foreign-investors/:id',
        component: SatoriLtdForeignInvestorFormComponent,
        canDeactivate: [SubscriptionFormCanDeactivateGuard]
      }, {
        path: 'satori-ltd-us-tax-exempt/:id',
        component: SatoriLtdUstaxExemptComponent,
        canDeactivate: [SubscriptionFormCanDeactivateGuard]
      },
      {
        path: 'subscription/:id/:workflowType',
        component: SubscriptionFormComponent,
        canDeactivate: [SubscriptionFormCanDeactivateGuard]        
      },
    ],
    canActivate: [ClientRouteCheckAuthHomeGuard]
  },
  // ClientRouteCheckAuthHomeGuard   is to check weather the client has access to that route or not.
  {
    path: 'additional-subscription-form', children: [{ 
      path: 'satori-additional-subscription/:id', 
      component: SatoriAdditionalSubscriptionComponent 
     }],
     canActivate: [ClientRouteCheckAuthHomeGuard]
  },
  { path: 'investor-information', component: AccountManagementComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthHomeGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


