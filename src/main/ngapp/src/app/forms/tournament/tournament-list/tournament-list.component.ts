import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/shared/models/tournament';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { MatDialog } from '@angular/material/dialog';
import { TournamentEditorComponent } from '../tournament-editor/tournament-editor.component';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  tournaments$: Observable<Tournament[]>;

  constructor(
    private tournamentService: TournamentService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.tournaments$ = this.tournamentService.getAll();
  }

  newTournament() {
    this.dialog.open(TournamentEditorComponent, {
      data: {isNew: true}
    });
  }

  viewTournament(tournament: Tournament) {
    this.tournamentService.navigate(tournament.id);
  }

  deleteTournament(tournament: Tournament) {
    this.tournamentService.delete(tournament.id);
  }

}
