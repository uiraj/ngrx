import { Component, OnInit } from '@angular/core';
import { UserState } from '@core/state/userState';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FaqItem, ISFState } from '@app/core/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { FaqComponent } from '@app/investor-subscription-forms/faq/faq.component';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  public userSubscription: Subscription;
  public userState: UserState;
  


  constructor(private store: Store<ISFState>, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('userState').subscribe((userState: UserState) => {
      this.userState = userState;
    });
  }
  
  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  public openFAQPopup(){
    const dialogRef = this.dialog.open(FaqComponent);

  }

}
