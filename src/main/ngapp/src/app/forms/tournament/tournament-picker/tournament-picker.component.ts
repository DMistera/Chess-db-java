import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/shared/models/tournament';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tournament-picker',
  templateUrl: './tournament-picker.component.html',
  styleUrls: ['./tournament-picker.component.scss']
})
export class TournamentPickerComponent implements OnInit {

  tournaments$: Observable<Tournament[]>;

  constructor(
    private tournamentService: TournamentService,
    private dialogRef: MatDialogRef<TournamentPickerComponent>
  ) { }

  ngOnInit() {
    this.tournaments$ = this.tournamentService.getAll();
  }

  end(tournament: Tournament) {
    this.dialogRef.close(tournament.id);
  }

}
