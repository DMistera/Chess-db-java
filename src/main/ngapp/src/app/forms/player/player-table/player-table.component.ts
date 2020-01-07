import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/models/player';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {

  @Input()
  players: Player[];

  constructor() { }

  ngOnInit() {
  }

}
