import { Injectable } from '@angular/core';
import {Client} from "../domain/client";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() {
  }

  public saveClient(client: Client): Observable<Client> {
    return of(client).pipe(delay(3000));
  }
}
