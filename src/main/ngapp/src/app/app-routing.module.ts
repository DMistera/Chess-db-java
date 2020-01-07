import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerViewComponent } from './forms/player/player-view/player-view.component';
import { ClubListComponent } from './forms/club/club-list/club-list.component';
import { ClubViewComponent } from './forms/club/club-view/club-view.component';
import { PlayerListComponent } from './forms/player/player-list/player-list.component';
import { GameListComponent } from './forms/game/game-list/game-list.component';
import { GameViewComponent } from './forms/game/game-view/game-view.component';


const routes: Routes = [
  {path: 'player', component: PlayerListComponent},
  {path: 'player/:id', component: PlayerViewComponent},
  {path: 'club', component: ClubListComponent},
  {path: 'club/:id', component: ClubViewComponent},
  {path: 'game', component: GameListComponent},
  {path: 'game/:id', component: GameViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
