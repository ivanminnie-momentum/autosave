import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IdNumberValidator} from "../../validator/id-number-validator";
import {ClientService} from "../../service/client.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Client} from "../../domain/client";
import {Adviser} from "../../domain/adviser";
import {debounceTime, filter, map} from "rxjs/operators";
import {SaveIndicatorComponent} from "../save-indicator/save-indicator.component";
import {AdviserService} from "../../service/adviser.service";
import {SaveDialogComponent} from "../save-dialog/save-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {SaveAble} from "../../domain/save-able";

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.scss']
})
export class AdviserComponent implements OnInit,SaveAble {

  public adviser: Adviser = new Adviser();
  public adviserForm: FormGroup;

  constructor(public adviserService: AdviserService, public snackBar: MatSnackBar,public dialog: MatDialog) {
    this.adviserForm = new FormGroup({
      name: new FormControl(this.adviser.name, []),
      idNumber: new FormControl(this.adviser.idNumber, [IdNumberValidator.validateIdNumber])
    });
  }

  ngOnInit(): void {
    this.adviserForm.valueChanges.pipe(
      debounceTime(2500),
      filter((status) => this.adviserForm.status === 'VALID' && !this.adviserForm.pristine),
      map((value) =>{
        this.adviser.name =  value.name;
        this.adviser.idNumber = value.idNumber;
        return this.adviser;
      })
    )
      .subscribe((value:Adviser) => {
        this.snackBar.openFromComponent(SaveIndicatorComponent, {
          data: 'Saving adviser'
        });

        this.adviserService.saveAdviser(this.adviser).subscribe(response => {
          this.snackBar.open('Saved','',{duration: 1500});
        }, error => {
          let snackBarRef = this.snackBar.open('Unable to save.','Details');
          snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
            const dialogRef = this.dialog.open(ErrorDialogComponent, {
              data: {message: error.message},
            });
          });
        }, () => {

        });
      });
  }

  canSave(): boolean {
    if(!(this.adviserForm.status === "VALID" ) && !this.adviserForm.pristine){
      this.adviserForm.updateValueAndValidity();
      this.adviserForm.markAllAsTouched();
      console.log('force validations....');
      return false;
    } else {
      return true;
    }
  }

}
