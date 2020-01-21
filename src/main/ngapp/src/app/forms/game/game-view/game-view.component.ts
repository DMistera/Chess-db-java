import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/shared/models/game';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/shared/services/game/game.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first, switchMap, tap } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { Player } from 'src/app/shared/models/player';
import { MatDialog } from '@angular/material/dialog';
import { GameEditorComponent } from '../game-editor/game-editor.component';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { Tournament } from 'src/app/shared/models/tournament';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  game$: Observable<Game>;
  tournament$: Observable<Tournament>;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.game$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.gameService.getByID(parseInt(params.id, 10));
    }), tap((game) => {
      if (game.tournamentID > 0) {
        this.tournament$ = this.tournamentService.getByID(game.tournamentID );
      }
    }));
  }

  getPlayer$(id: number) {
    return this.playerService.getByID(id);
  }

  getResultString(whitePlayer: Player, blackPlayer: Player, result: string) {
    switch (result) {
      case 'W':
        return whitePlayer.name + ' ' + whitePlayer.surname + ' won';
      case 'B':
        return blackPlayer.name + ' ' + blackPlayer.surname + ' won';
      case 'T':
        return 'Tie';
      default:
        return 'Undefined';
    }
  }

  edit(gameID: number) {
    this.dialog.open(GameEditorComponent, {
      data: {id: gameID, isNew: false}
    });
  }

}
