import { Injectable } from '@angular/core';
import {Client} from "../domain/client";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }


  public saveClient(client: Client): Observable<Client> {
    console.log('Client saved to service');
    console.log(client);

   // throw Observable.throw(new Error('ivan error'));
   // return throwError(new Error('ivan error')).pipe(delay(3000));
    //return Observable.throw(new Error('ivan error')).pipe(delay(2000));// of(client).pipe(delay(2000));
    return of(client).pipe(delay(3000));
  }
}
