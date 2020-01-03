import { Component, OnInit, Inject } from '@angular/core';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';
import { Game } from 'src/app/shared/models/game';
import { FormControl, FormGroup } from '@angular/forms';
import { GameService } from 'src/app/shared/services/game/game.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PlayerPickerComponent } from '../../player/player-picker/player-picker.component';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { Player } from 'src/app/shared/models/player';
import { Observable } from 'rxjs';

export interface GameResult {
  value: string;
  name: string;
}

@Component({
  selector: 'app-game-editor',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.scss']
})
export class GameEditorComponent extends EditorTemplate<Game, number> {

  dateControl = new FormControl('');
  resultControl = new FormControl('');
  gameForm = new FormGroup({
    date: this.dateControl,
    result: this.resultControl
  });

  whitePlayer$: Observable<Player>;
  whitePlayerID: number;

  blackPlayer$: Observable<Player>;
  blackPlayerID: number;

  gameResults: GameResult[] = [
    {value: 'W', name: '1-0'},
    {value: 'B', name: '0-1'},
    {value: 'T', name: '1/2-1/2'},
  ];

  constructor(
    gameService: GameService,
    dialogRef: MatDialogRef<GameEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData<number>,
    private dialog: MatDialog,
    private playerService: PlayerService
  ) {
    super(gameService, dialogRef, data);
  }

  protected initForm(entity: Game): void {
    this.dateControl.setValue(entity.date);
    this.resultControl.setValue(entity.result);
  }

  protected validate(): boolean {
    return this.whitePlayerID > 0 && this.blackPlayerID > 0;
  }

  protected createEntity(): Game {
    const game = new Game();
    game.id = this.data.id;
    game.result = this.resultControl.value;
    game.date = this.dateControl.value;
    game.whitePlayerID = this.whitePlayerID;
    game.blackPlayerID = this.blackPlayerID;
    return game;
  }

  public pickWhitePlayer() {
    const dialogRef = this.dialog.open(PlayerPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.whitePlayer$ = this.playerService.getByID(id);
        this.whitePlayerID = id;
      }
    });
  }

  public pickBlackPlayer() {
    const dialogRef = this.dialog.open(PlayerPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.blackPlayer$ = this.playerService.getByID(id);
        this.blackPlayerID = id;
      }
    });
  }

}
