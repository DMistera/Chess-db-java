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

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private playerService: PlayerService,
    private sponsorService: SponsorService,
    private refereeService: RefereeService,
    private mediaPatronService: MediaPatronService,
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
    }));
  }

  edit(tournamentID: number) {
    this.dialog.open(TournamentEditorComponent, {
      data: {id: tournamentID, isNew: false}
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

}
