import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaPatron } from 'src/app/shared/models/media-patron';
import { Tournament } from 'src/app/shared/models/tournament';
import { MediaPatronService } from 'src/app/shared/services/media-patron/media-patron.service';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TournamentPickerComponent } from '../../tournament/tournament-picker/tournament-picker.component';

@Component({
  selector: 'app-media-patron-view',
  templateUrl: './media-patron-view.component.html',
  styleUrls: ['./media-patron-view.component.scss']
})
export class MediaPatronViewComponent implements OnInit {

  mediaPatron$: Observable<MediaPatron>;
  tournaments$: Observable<Tournament[]>;

  constructor(
    private mediaPatronService: MediaPatronService,
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mediaPatron$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.mediaPatronService.getByID(params.id);
    }), tap(mediaPatron => {
      this.tournaments$ = this.tournamentService.getMediaPatronTournaments(mediaPatron.name);
    }));
  }

  showTournament(tournament: Tournament) {
    this.tournamentService.navigate(tournament.id);
  }

  leaveTournament(mediaPatron: MediaPatron, tournament: Tournament) {
    this.tournamentService.removeMediaPatron(tournament.id, mediaPatron.name);
  }

  joinTournament(mediaPatron: MediaPatron) {
    const dialogRef = this.dialog.open(TournamentPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.tournamentService.addMediaPatron(id, mediaPatron.name);
      }
    });
  }

}
