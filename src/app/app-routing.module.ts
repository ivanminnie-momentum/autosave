import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./component/client/client.component";
import {AdviserComponent} from "./component/adviser/adviser.component";
import {CanSaveGuard} from "./guard/can-save.guard";

export const routes: Routes = [
  {path: 'client', component: ClientComponent, data: {animation: 'HomePage'},canDeactivate: [CanSaveGuard]},
  {path: 'adviser', component: AdviserComponent, canDeactivate: [CanSaveGuard]},
  { path: '',   redirectTo: '/client', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
