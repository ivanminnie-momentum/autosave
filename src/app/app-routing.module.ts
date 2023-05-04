import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "./auto-save/component/client/client.component";
import {AdviserComponent} from "./auto-save/component/adviser/adviser.component";
import {CanSaveGuard} from "./auto-save/guard/can-save.guard";
import {ChatComponent} from "./chat/component/chat/chat.component";

export const routes: Routes = [
  {path: 'client', component: ClientComponent, data: {animation: 'HomePage'}, canDeactivate: [CanSaveGuard]},
  {path: 'adviser', component: AdviserComponent, data: {animation: 'HomePage'}, canDeactivate: [CanSaveGuard]},
  {path: 'chat', component: ChatComponent,data: {animation: 'HomePage'}},
  { path: '',   redirectTo: '/client', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
