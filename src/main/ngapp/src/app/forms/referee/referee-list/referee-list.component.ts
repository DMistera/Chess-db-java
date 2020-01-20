import { Component, OnInit } from '@angular/core';
import { Referee } from 'src/app/shared/models/referee';
import { Observable } from 'rxjs';
import { RefereeService } from 'src/app/shared/services/referee/referee.service';
import { MatDialog } from '@angular/material/dialog';
import { RefereeEditorComponent } from '../referee-editor/referee-editor.component';

@Component({
  selector: 'app-referee-list',
  templateUrl: './referee-list.component.html',
  styleUrls: ['./referee-list.component.scss']
})
export class RefereeListComponent implements OnInit {

  referees$: Observable<Referee[]>;

  constructor(
    private refereeService: RefereeService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.referees$ = this.refereeService.getAll();
  }

  newReferee() {
    this.dialog.open(RefereeEditorComponent, {
      data: {isNew: true}
    });
  }

  deleteReferee(referee: Referee) {
    this.refereeService.delete(referee.id);
  }

  viewReferee(referee: Referee) {
    this.refereeService.navigate(referee.id);
  }

}
