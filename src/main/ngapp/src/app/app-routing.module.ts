import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListComponent } from './forms/player/player-list/component/player-list.component';
import { PlayerEditorComponent } from './forms/player/player-editor/player-editor.component';
import { PlayerViewComponent } from './forms/player/player-view/player-view.component';
import { ClubListComponent } from './forms/club/club-list/club-list.component';
import { ClubEditorComponent } from './forms/club/club-editor/club-editor.component';
import { ClubViewComponent } from './forms/club/club-view/club-view.component';


const routes: Routes = [
  {path: 'players', component: PlayerListComponent},
  {path: 'player-editor', component: PlayerEditorComponent},
  {path: 'players/:id', component: PlayerViewComponent},
  {path: 'clubs', component: ClubListComponent},
  {path: 'club-editor', component: ClubEditorComponent},
  {path: 'clubs/:id', component: ClubViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
