import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/app/shared/models/sponsor';
import { Observable, forkJoin } from 'rxjs';
import { SponsorService } from 'src/app/shared/services/sponsor/sponsor.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first, switchMap, tap, map, concatMap } from 'rxjs/operators';
import { Prize } from 'src/app/shared/models/prize';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';

@Component({
  selector: 'app-sponsor-view',
  templateUrl: './sponsor-view.component.html',
  styleUrls: ['./sponsor-view.component.scss']
})
export class SponsorViewComponent implements OnInit {

  sponsor$: Observable<Sponsor>;
  prizes$: Observable<Prize[]>;
  tournamentCount$: Observable<number>;

  constructor(
    private sponsorService: SponsorService,
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sponsor$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.sponsorService.getByID(params.id);
    }), tap(sponsor => {
      this.prizes$ = this.sponsorService.getPrizes(sponsor.name);
      this.tournamentCount$ = this.sponsorService.getTournamentCount(sponsor.name);
    }));
  }

  deletePrize(prize: Prize) {
    this.tournamentService.removePrize(prize);
  }

  showTournament(prize: Prize) {
    this.tournamentService.navigate(prize.tournamentID);
  }

  prizeMapper = (prize: Prize) => {
    return this.tournamentService.getByID(prize.tournamentID).pipe(map(tournament => {
      return {
        name: prize.name,
        quantity: prize.quantity,
        tournamentName: tournament.name
      };
    }), first());
  }
}

export interface PrizeTableElement {
  name: string;
  quantity: number;
  tournamentName: string;
}
