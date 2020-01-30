import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/shared/services/game/game.service';
import { Game } from 'src/app/shared/models/game';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-picker',
  templateUrl: './game-picker.component.html',
  styleUrls: ['./game-picker.component.scss']
})
export class GamePickerComponent implements OnInit {

   games$: Observable<Game[]>;

  constructor(
    private gameService: GameService,
    private dialogRef: MatDialogRef<GamePickerComponent>
  ) { }

  ngOnInit() {
    this.games$ = this.gameService.getAll();
  }

  end(game: Game) {
    console.log("end");
    this.dialogRef.close(game.id);
  }

}
