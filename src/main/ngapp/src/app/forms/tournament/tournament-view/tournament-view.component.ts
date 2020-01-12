import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { Tournament } from 'src/app/shared/models/tournament';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TournamentEditorComponent } from '../tournament-editor/tournament-editor.component';

@Component({
  selector: 'app-tournament-view',
  templateUrl: './tournament-view.component.html',
  styleUrls: ['./tournament-view.component.scss']
})
export class TournamentViewComponent implements OnInit {

  tournament$: Observable<Tournament>;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.tournament$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.tournamentService.getByID(parseInt(params.id, 10));
    }));
  }

  edit(tournamentID: number) {
    this.dialog.open(TournamentEditorComponent, {
      data: {id: tournamentID, isNew: false}
    });
  }

}
