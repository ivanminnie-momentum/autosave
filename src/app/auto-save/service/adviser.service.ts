import { Injectable } from '@angular/core';
import {Client} from "../domain/client";
import {Adviser} from "../domain/adviser";
import {Observable, of, throwError, timer} from "rxjs";
import {delay, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdviserService {

  constructor() {
  }

  public saveAdviser(adviser: Adviser): Observable<Adviser | Error> {

    if (adviser.name.length > 0){
      return of(adviser).pipe(delay(2000));
    } else {
      let error: Observable<Error> = throwError(new Error('Back end needs name to be set.'));
      return timer(4000).pipe(mergeMap(e => error));
    }

  }
}
