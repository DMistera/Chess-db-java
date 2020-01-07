import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/shared/models/player';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-player-picker',
  templateUrl: './player-picker.component.html',
  styleUrls: ['./player-picker.component.scss']
})
export class PlayerPickerComponent implements OnInit {

  players$: Observable<Player[]>;

  constructor(
    private playerService: PlayerService,
    private dialogRef: MatDialogRef<PlayerPickerComponent>
    ) { }

  ngOnInit() {
    this.players$ = this.playerService.getAll();
  }

  end(player: Player) {
    this.dialogRef.close(player.id);
  }

}
