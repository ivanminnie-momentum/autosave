import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {SaveDialogComponent} from "../component/save-dialog/save-dialog.component";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CanSaveGuard implements CanActivate, CanDeactivate<unknown> {

  constructor(public dialog: MatDialog) {



  }

  openDialog(): Observable<any> {
    const dialogRef = this.dialog.open(SaveDialogComponent);
    return  dialogRef.afterClosed().pipe(  map((value) =>{
     if (value ==='CANCEL'){
       return false;
     } else if (value ==='NAVIGATE'){
       return true;
     }
     return true;
    }));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(component);



    // @ts-ignore
    console.log(typeof component.save === 'function');
    // @ts-ignore
    if (typeof component.canSave === 'function'){
      // @ts-ignore
      if (component.canSave()){
        console.log("Can save");
        return true;
      } else {
        console.log("Cant save.......")
        return this.openDialog();
      }
    } else {
      return true;
    }
    return true;
  }

}
