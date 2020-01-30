import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Game } from 'src/app/shared/models/game';
import { GameService } from 'src/app/shared/services/game/game.service';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { forkJoin, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements OnInit {

  @Input()
  games: Game[];

  @Output()
  selectGame = new EventEmitter<Game>();

  @Output()
  deleteGame = new EventEmitter<Game>();

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private tournamentService: TournamentService,
  ) { }

  ngOnInit() {
  }

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

}
