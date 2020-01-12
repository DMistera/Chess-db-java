import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Organizer } from 'src/app/shared/models/organizer';
import { OrganizerService } from 'src/app/shared/services/organizer/organizer.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first, switchMap, tap } from 'rxjs/operators';
import { Tournament } from 'src/app/shared/models/tournament';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';

@Component({
  selector: 'app-organizer-view',
  templateUrl: './organizer-view.component.html',
  styleUrls: ['./organizer-view.component.scss']
})
export class OrganizerViewComponent implements OnInit {

  organizer$: Observable<Organizer>;
  tournaments$: Observable<Tournament[]>;

  constructor(
    private organizerService: OrganizerService,
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.organizer$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.organizerService.getByID(params.id);
    }), tap(organizer => {
      this.tournaments$ = this.tournamentService.getOrganizerTournaments(organizer.name);
    }));
  }

  showTournament(tournament: Tournament) {
    this.tournamentService.navigate(tournament.id);
  }

}
