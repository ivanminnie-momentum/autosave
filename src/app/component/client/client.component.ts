import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../service/client.service";
import {Client} from "../../domain/client";
import {SaveAble} from "../../domain/save-able";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {IdNumberValidator} from "../../validator/id-number-validator";
import {auditTime, debounceTime, filter, map, takeUntil, takeWhile, tap} from "rxjs/operators";
import {of, Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SaveIndicatorComponent} from "../save-indicator/save-indicator.component";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit,SaveAble {

  public client: Client = new Client();
  public clientForm: FormGroup;

  constructor(public clientService: ClientService, public snackBar: MatSnackBar) {
    /*
    this.client.name = 'ivan';
    this.client.surname = 'minnie';
    this.client.preferredName = 'ivan';
    this.client.idNumber = '831202506708';

     */

    this.clientForm = new FormGroup({
      name: new FormControl(this.client.name, [Validators.required]),
      preferredName: new FormControl(this.client.preferredName, []),
      surname: new FormControl(this.client.surname, [Validators.required]),
      idNumber: new FormControl(this.client.idNumber, [IdNumberValidator.validateIdNumber])
    });
  }

  ngOnInit() {

    let sub:Subscription = new Subscription();

     this.clientForm.valueChanges.pipe(
        debounceTime(2500),
        filter((status) => this.clientForm.status === 'VALID' && !this.clientForm.pristine),
        map((value) =>{
          this.client.name =  value.name;
          this.client.preferredName = value.preferredName;
          this.client.surname = value.surname;
          this.client.idNumber = value.idNumber;
          return this.client;
        })
      )
       .subscribe((value:Client) => {
        this.snackBar.openFromComponent(SaveIndicatorComponent, {
          data: 'Saving client'
        });

        this.clientService.saveClient(this.client).subscribe(response => {
          this.snackBar.open('Saved','',{duration: 1500});
        }, error => {
          this.snackBar.open('Unable to save.','Details');
        }, () => {

        });
      });

  }

  /*
   filter((status) => status === 'VALID'),
    withLatestFrom(formControl.valueChanges),
    map(([_status, value]) => value),
    switchMap(value=>this.service.save(value)) // if you are using a service
    takeUntil(this.destroy$)
   */

  ngOnDestroy() {

  }

  public canSave(): boolean {
    if(!(this.clientForm.status === "VALID" ) && !this.clientForm.pristine){
      this.clientForm.updateValueAndValidity();
      this.clientForm.markAllAsTouched();
      console.log('force validations....');
      return false;
    } else {
      return true;
    }
  }



}
