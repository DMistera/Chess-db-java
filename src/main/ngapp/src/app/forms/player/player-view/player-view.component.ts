import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/models/player';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { map, mergeMap, switchMap, concatMap, tap, concatMapTo, exhaustMap, first } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerEditorComponent } from '../player-editor/player-editor.component';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { Club } from 'src/app/shared/models/club';
import { ClubPickerComponent } from '../../club/club-picker/club-picker.component';
import { Tournament } from 'src/app/shared/models/tournament';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { TournamentPickerComponent } from '../../tournament/tournament-picker/tournament-picker.component';
import { Game } from 'src/app/shared/models/game';
import { GameService } from 'src/app/shared/services/game/game.service';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  player$: Observable<Player>;
  tournaments$: Observable<Tournament[]>;
  games$: Observable<Game[]>;

  gameCount$: Observable<number>;
  tournamentCount$: Observable<number>;

  constructor(
    private playerService: PlayerService,
    private tournamentService: TournamentService,
    private gameService: GameService,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.player$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.playerService.getByID(parseInt(params.id, 10));
    }), tap(player => {
      this.tournaments$ = this.tournamentService.getPlayerTournaments(player.id);
      this.games$ = this.gameService.getPlayerGames(player.id);
      this.gameCount$ = this.playerService.getGameCount(player.id);
      this.tournamentCount$ = this.playerService.getTournamentCount(player.id);
    }));
  }

  joinClub(playerID: number) {
    const dialogRef = this.dialog.open(ClubPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.clubService.addPlayer(id, playerID);
      }
    });
  }

  getClub$(id: number): Observable<Club> {
    return this.clubService.getByID(id);
  }

  editPlayer(playerID: number) {
    this.dialog.open(PlayerEditorComponent, {
      data: {id: playerID, isNew: false}
    });
  }

  joinTournament(playerID: number) {
    const dialogRef = this.dialog.open(TournamentPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.tournamentService.addPlayer(id, playerID);
      }
    });
  }

  showTournament(tournament: Tournament) {
    this.tournamentService.navigate(tournament.id);
  }

  quitTournament(playerID: number, tournament: Tournament) {
    this.tournamentService.removePlayer(tournament.id, playerID);
  }

  deleteGame(game: Game) {
    this.gameService.delete(game.id);
  }

  showGame(game: Game) {
    this.gameService.navigate(game.id);
  }

}
