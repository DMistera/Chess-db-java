import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Referee } from 'src/app/shared/models/referee';
import { RefereeService } from 'src/app/shared/services/referee/referee.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-referee-picker',
  templateUrl: './referee-picker.component.html',
  styleUrls: ['./referee-picker.component.scss']
})
export class RefereePickerComponent implements OnInit {

  referees$: Observable<Referee[]>;

  constructor(
    private refereeService: RefereeService,
    private dialogRef: MatDialogRef<RefereePickerComponent>
  ) { }

  ngOnInit() {
    this.referees$ = this.refereeService.getAll();
  }

  end(referee: Referee) {
    this.dialogRef.close(referee.id);
  }

}
