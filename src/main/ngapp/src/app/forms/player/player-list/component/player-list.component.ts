import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Player } from 'src/app/shared/models/player';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerEditorComponent } from '../../player-editor/player-editor.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  players$: Observable<Player[]>;

  constructor(private http: HttpClient, private playerService: PlayerService, private dialog: MatDialog) { }

  ngOnInit() {
    this.players$ =  this.playerService.getAll();
  }

  newPlayer() {
    this.dialog.open(PlayerEditorComponent, {
      data: {id: -1, isNew: true}
    });
  }

}
