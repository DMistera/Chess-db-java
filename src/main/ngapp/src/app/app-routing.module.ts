import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListComponent } from './forms/player-list/component/player-list.component';
import { PlayerEditorComponent } from './forms/player-editor/player-editor.component';


const routes: Routes = [
  {path: 'players', component: PlayerListComponent},
  {path: 'player-editor', component: PlayerEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
