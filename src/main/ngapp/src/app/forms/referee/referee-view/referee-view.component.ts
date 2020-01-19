import { Component, OnInit } from '@angular/core';
import { Referee } from 'src/app/shared/models/referee';
import { RefereeService } from 'src/app/shared/services/referee/referee.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { first, switchMap, tap } from 'rxjs/operators';
import { Tournament } from 'src/app/shared/models/tournament';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';

@Component({
  selector: 'app-referee-view',
  templateUrl: './referee-view.component.html',
  styleUrls: ['./referee-view.component.scss']
})
export class RefereeViewComponent implements OnInit {

  referee$: Observable<Referee>;
  tournaments$: Observable<Tournament[]>;

  constructor(
    private refereeService: RefereeService,
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.referee$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.refereeService.getByID(parseInt(params.id, 10));
    }), tap(referee => {
      this.tournaments$ = this.tournamentService.getRefereeTournaments(referee.id);
    }));
  }

  pickTournament() {

  }

}
