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

  gameMapper = (game: Game) => {
    return forkJoin([
      this.playerService.getByID(game.whitePlayerID).pipe(first()),
      this.playerService.getByID(game.blackPlayerID).pipe(first()),
      (game.tournamentID > 0 ? this.tournamentService.getByID(game.tournamentID).pipe(first()) : of(null))
    ]).pipe(map(result => {
      const whitePlayer = result[0];
      const blackPlayer = result[1];
      const tournament = result[2];
      return {
        date: game.date,
        whitePlayer: whitePlayer.name + ' ' + whitePlayer.surname,
        blackPlayer: blackPlayer.name + ' ' + blackPlayer.surname,
        result: this.getResultString(game.result),
        tournament: (tournament ? tournament.name : 'None')
      };
    }));
  }

  getResultString(code: string) {
    switch (code) {
      case 'W':
        return 'White';
      case 'B':
        return 'Black';
      default:
        return 'Undefined';
    }
  }

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

}
