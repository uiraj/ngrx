import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';;
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';


const material = [
  MatAutocompleteModule,
  MatButtonModule,
  MatSnackBarModule,
  MatCardModule, 
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatToolbarModule,
  MatDialogModule, 
  MatSelectModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatMenuModule,
  MatDialogModule ,
  MatTabsModule
];

@NgModule({
  imports: [FontAwesomeModule, material],
  exports: [FontAwesomeModule, material],

  providers: [
  ],
  declarations: []
 
})
export class MaterialModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(far, fas);
  }
}