import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/shared/models/tournament';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  private tournaments$: Observable<Tournament[]>;

  constructor() { }

  ngOnInit() {
  }

}
