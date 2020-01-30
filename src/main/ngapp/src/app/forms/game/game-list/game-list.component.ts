import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/shared/services/game/game.service';
import { Observable, forkJoin, of } from 'rxjs';
import { Game } from 'src/app/shared/models/game';
import { MatDialog } from '@angular/material/dialog';
import { GameEditorComponent } from '../game-editor/game-editor.component';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { map, first } from 'rxjs/operators';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  games$: Observable<Game[]>;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private tournamentService: TournamentService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.games$ = this.gameService.getAll();
  }

  newGame() {
    this.dialog.open(GameEditorComponent, {
      data: {isNew: true}
    });
  }

  viewGame(game: Game) {
    this.gameService.navigate(game.id);
  }

  deleteGame(game: Game) {
    this.gameService.delete(game.id);
  }

}
