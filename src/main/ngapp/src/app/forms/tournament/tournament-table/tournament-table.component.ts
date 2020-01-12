import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tournament } from 'src/app/shared/models/tournament';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.scss']
})
export class TournamentTableComponent implements OnInit {

  @Input()
  tournaments: Tournament[];

  @Output()
  selectEntity = new EventEmitter<Tournament>();

  data: any[];

  constructor() { }

  ngOnInit() {
  }

}


