import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
 public title: string;
 public message: string;
 public confirmBtnText: string;
 public cancelBtnText:string;
 public showCancelBtn:boolean;
 public showMatIcon:boolean;
 public showButtonsReverse:boolean;
 public matIcon:string;
 public conformBtnClass:string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.confirmBtnText = data.confirmBtnText?data.confirmBtnText:"Submit";
    this.cancelBtnText = data.cancelBtnText?data.cancelBtnText:"Cancel";
    this.showCancelBtn =  data.hideCancelBtn?data.hideCancelBtn:true;
    this.showMatIcon =  data.showMatIcon?data.showMatIcon:false;
    this.showButtonsReverse =  data.showButtonsReverse?data.showButtonsReverse:false;
    this.matIcon = data.matIcon?data.matIcon:'check_circle';
    this.conformBtnClass = data.conformBtnClass?data.conformBtnClass:'';
  }

  ngOnInit() {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
