import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLoadService } from '../app/core/services/api.load.service';
import { appLoad } from './shared/app.load';
import { CoreModule } from './core/state/module';
import { MaterialModule } from './shared/material.module';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BaseComponent } from '../app/ISF/base/base.component';
import { AccountManagementComponent } from './ISF/account-management/account-management.component';
// import { SatoriOneEntityFormComponent } from './ISF/satori-one-entity-form/satori-one-entity-form.component';
// import { SatoriTwoPersonFormComponent } from './ISF/satori-two-person-form/satori-two-person-form.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { HomeComponent } from './ISF//home/home.component';
import { NavBarComponent } from './ISF/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
// import { SatoriTwoEntityFormComponent } from './investor-subscription-forms/satory-two-entity-form/satori-two-entity-form.component';
// import { SatoriOnePersonFormComponent } from './investor-subscription-forms/satori-one-person-form/satori-one-person-form.component';
import { FooterComponent } from './ISF/footer/footer.component';
// import { SatoriLtdUstaxExemptComponent } from './investor-subscription-forms/satori-ltd-ustax-exempt/satori-ltd-ustax-exempt.component';
// import { SatoriLtdForeignInvestorFormComponent } from './investor-subscription-forms/satori-ltd-foreign-investor-form/satori-ltd-foreign-investor-form.component';
// import { SatoriAdditionalSubscriptionComponent } from './investor-subscription-forms/satori-additional-subscription/satori-additional-subscription.component';
// import { SubscriptionFormComponent } from './investor-subscription-forms/subscription-form/subscription-form.component';

// import { httpInterceptorProviders, StpSharedLibraryModule } from 'stp-shared-library';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FaqComponent } from './ISF/faq/faq.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    BaseComponent,
    AccountManagementComponent,
    FooterComponent,
    // SatoriOneEntityFormComponent,
    // SatoriTwoPersonFormComponent,
    ConfirmDialogComponent,
    HomeComponent,
    NavBarComponent,
    // SatoriTwoEntityFormComponent,
    // SatoriOnePersonFormComponent,
    // SatoriLtdUstaxExemptComponent,
    // SatoriLtdForeignInvestorFormComponent,
    // SatoriAdditionalSubscriptionComponent,
    // SubscriptionFormComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    EffectsModule.forRoot()
    // StpSharedLibraryModule,
    // StoreDevtoolsModule,
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25, // Retains last 25 states
      
    // }),
  ],
  exports: [
    CoreModule,
    AccountManagementComponent,
    ReactiveFormsModule,  
    FormsModule,
    BaseComponent
  ],
  providers: [
    {
      deps: [AppLoadService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: appLoad
    },
    { 
      provide: LocationStrategy,
      useClass: HashLocationStrategy 
    },
    // httpInterceptorProviders
  ],

  bootstrap: [BaseComponent]
})
export class AppModule { }
