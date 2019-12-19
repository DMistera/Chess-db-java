import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Club } from 'src/app/shared/models/club';
import { first, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-club-view',
  templateUrl: './club-view.component.html',
  styleUrls: ['./club-view.component.scss']
})
export class ClubViewComponent implements OnInit {

  club$: Observable<Club>;
  playerCount$: Observable<number>;
  id: number;

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.club$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.clubService.getByID(parseInt(params.id, 10));
    }));

    this.playerCount$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.clubService.getPlayerCount(parseInt(params.id, 10));
    }));
  }

}