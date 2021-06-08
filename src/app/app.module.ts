import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { ClientComponent } from './component/client/client.component';
import { AdviserComponent } from './component/adviser/adviser.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { SaveIndicatorComponent } from './component/save-indicator/save-indicator.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SaveDialogComponent } from './component/save-dialog/save-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ErrorDialogComponent } from './component/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AdviserComponent,
    SaveIndicatorComponent,
    SaveDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {

  }
}
