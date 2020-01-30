import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/shared/models/player';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerEditorComponent } from '../player-editor/player-editor.component';
import { GameService } from 'src/app/shared/services/game/game.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  players$: Observable<Player[]>;

  constructor(
              private playerService: PlayerService,
              private gameService: GameService,
              private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.players$ =  this.playerService.getAll();
  }

  newPlayer() {
    this.dialog.open(PlayerEditorComponent, {
      data: {isNew: true}
    });
  }

  viewPlayer(player: Player) {
    this.playerService.navigate(player.id);
  }

  deletePlayer(player: Player) {
    this.playerService.delete(player.id);
    this.gameService.refresh();
  }

}
