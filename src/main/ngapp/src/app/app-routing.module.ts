import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListComponent } from './forms/player-list/component/player-list.component';
import { PlayerEditorComponent } from './forms/player-editor/player-editor.component';
import { PlayerViewComponent } from './forms/player-view/player-view.component';


const routes: Routes = [
  {path: 'players', component: PlayerListComponent},
  {path: 'player-editor', component: PlayerEditorComponent},
  {path: 'players/:id', component: PlayerViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
