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

@Component({
  selector: 'app-tournament-view',
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.scss']
})
export class TournamentViewComponent implements OnInit {

  tournament$: Observable<Tournament>;
  players$: Observable<Player[]>;
  prizes$: Observable<Prize[]>;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private playerService: PlayerService,
    private sponsorService: SponsorService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.tournament$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.tournamentService.getByID(parseInt(params.id, 10));
    }), tap(tournament => {
      this.players$ = this.playerService.getTournamentPlayers(tournament.id);
      this.prizes$ = this.tournamentService.getPrizes(tournament.id);
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

  showPlayer(player: Player) {
    this.playerService.navigate(player.id);
  }

  showSponsor(prize: Prize) {
    this.sponsorService.navigate(prize.sponsorName);
  }

}
