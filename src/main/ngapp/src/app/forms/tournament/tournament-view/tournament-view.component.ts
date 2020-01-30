import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { Tournament } from 'src/app/shared/models/tournament';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { first, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TournamentEditorComponent } from '../tournament-editor/tournament-editor.component';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { Player } from 'src/app/shared/models/player';
import { PlayerPickerComponent } from '../../player/player-picker/player-picker.component';
import { Prize } from 'src/app/shared/models/prize';
import { PrizeEditorComponent } from '../../prize/prize-editor/prize-editor.component';
import { SponsorService } from 'src/app/shared/services/sponsor/sponsor.service';
import { Referee } from 'src/app/shared/models/referee';
import { MediaPatron } from 'src/app/shared/models/media-patron';
import { RefereeService } from 'src/app/shared/services/referee/referee.service';
import { MediaPatronService } from 'src/app/shared/services/media-patron/media-patron.service';
import { RefereePickerComponent } from '../../referee/referee-picker/referee-picker.component';
import { MediaPatronPickerComponent } from '../../media-patron/media-patron-picker/media-patron-picker.component';
import { GameService } from 'src/app/shared/services/game/game.service';
import { Game } from 'src/app/shared/models/game';
import { GamePickerComponent } from '../../game/game-picker/game-picker.component';

@Component({
  selector: 'app-tournament-view',
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.scss']
})
export class TournamentViewComponent implements OnInit {

  tournament$: Observable<Tournament>;
  players$: Observable<Player[]>;
  prizes$: Observable<Prize[]>;
  referees$: Observable<Referee[]>;
  mediaPatrons$: Observable<MediaPatron[]>;
  games$: Observable<Game[]>;

  playerCount$: Observable<number>;
  refereeCount$: Observable<number>;
  mediaPatronCount$: Observable<number>;
  sponsorCount$: Observable<number>;
  gameCount$: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private playerService: PlayerService,
    private sponsorService: SponsorService,
    private refereeService: RefereeService,
    private mediaPatronService: MediaPatronService,
    private gameService: GameService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.tournament$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.tournamentService.getByID(parseInt(params.id, 10));
    }), tap(tournament => {
      this.players$ = this.playerService.getTournamentPlayers(tournament.id);
      this.prizes$ = this.tournamentService.getPrizes(tournament.id);
      this.referees$ = this.refereeService.getTournamentReferees(tournament.id);
      this.mediaPatrons$ = this.mediaPatronService.getTournamentMediaPatrons(tournament.id);
      this.games$ = this.gameService.getTournamentGames(tournament.id);
      this.playerCount$ = this.tournamentService.getPlayerCount(tournament.id);
      this.refereeCount$ = this.tournamentService.getRefereeCount(tournament.id);
      this.mediaPatronCount$ = this.tournamentService.getPatronCount(tournament.id);
      this.sponsorCount$ = this.tournamentService.getSponsorCount(tournament.id);
      this.gameCount$ = this.tournamentService.getGameCount(tournament.id);
    }));
  }

  edit(tournamentID: number) {
    this.dialog.open(TournamentEditorComponent, {
      data: {id: tournamentID, isNew: false}
    });
  }

  addGame(tournamentID: number) {
    const dialogRef = this.dialog.open(GamePickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.tournamentService.addGame(tournamentID, id);
      }
    });
  }

  addPlayer(tournamentID: number) {
    const dialogRef = this.dialog.open(PlayerPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.tournamentService.addPlayer(tournamentID, id);
      }
    });
  }

  addReferee(tournamentID: number) {
    const dialogRef = this.dialog.open(RefereePickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.tournamentService.addReferee(tournamentID, id);
      }
    });
  }

  addMediaPatron(tournamentID: number) {
    const dialogRef = this.dialog.open(MediaPatronPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.tournamentService.addMediaPatron(tournamentID, id);
      }
    });
  }

  addPrize(tournamentID: number) {
    this.dialog.open(PrizeEditorComponent, {
      data: tournamentID
    });
  }

  removePrize(prize: Prize) {
    this.tournamentService.removePrize(prize);
  }

  removePlayer(tournamentID: number, player: Player) {
    this.tournamentService.removePlayer(tournamentID, player.id);
  }

  removeReferee(tournament: Tournament, referee: Referee) {
    this.tournamentService.removeReferee(tournament.id, referee.id);
  }

  removeMediaPatron(tournament: Tournament, mediaPatron: MediaPatron) {
    this.tournamentService.removeMediaPatron(tournament.id, mediaPatron.name);
  }

  showReferee(referee: Referee) {
    this.refereeService.navigate(referee.id);
  }

  showPlayer(player: Player) {
    this.playerService.navigate(player.id);
  }

  showSponsor(prize: Prize) {
    this.sponsorService.navigate(prize.sponsorName);
  }

  showMediaPatron(mediaPatron: MediaPatron) {
    this.mediaPatronService.navigate(mediaPatron.name);
  }

  showGame(game: Game) {
    this.gameService.navigate(game.id);
  }

  removeGame(id:number, game: Game) {
    this.tournamentService.removeGame(id, game.id);
  }

}
