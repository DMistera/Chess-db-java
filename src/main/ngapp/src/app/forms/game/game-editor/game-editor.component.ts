import { Component, OnInit, Inject } from '@angular/core';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';
import { Game } from 'src/app/shared/models/game';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameService } from 'src/app/shared/services/game/game.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PlayerPickerComponent } from '../../player/player-picker/player-picker.component';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { Player } from 'src/app/shared/models/player';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, map } from 'rxjs/operators';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { TournamentPickerComponent } from '../../tournament/tournament-picker/tournament-picker.component';

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

  dateForm = new FormControl('', [Validators.required]);
  resultForm = new FormControl('', [Validators.required]);
  whitePlayerForm = new FormControl({value: '', disabled: true}, [Validators.required]);
  blackPlayerForm = new FormControl({value: '', disabled: true}, [Validators.required]);
  tournamentForm = new FormControl({value: '', disabled: true});
  gameForm = new FormGroup({
    date: this.dateForm,
    result: this.resultForm,
    whitePlayer: this.whitePlayerForm,
    blackPlayer: this.blackPlayerForm,
    tournament: this.tournamentForm
  });

  whitePlayerID: number;
  blackPlayerID: number;
  tournamentID: number;

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
    private playerService: PlayerService,
    private tournamentService: TournamentService,
    snackBar: MatSnackBar
  ) {
    super(gameService, dialogRef, data, snackBar);
  }

  protected initForm(entity: Game): void {
    this.dateForm.setValue(entity.date);
    this.resultForm.setValue(entity.result);
    this.whitePlayerID = entity.whitePlayerID;
    this.blackPlayerID = entity.blackPlayerID;
    this.tournamentID = entity.tournamentID;
    this.setWhitePlayerFormValue();
    this.setBlackPlayerFormValue();
    this.setTournamentFormValue();
  }

  protected validate(): boolean {
    return this.whitePlayerID > 0 && this.blackPlayerID > 0 && this.gameForm.valid;
  }

  protected createEntity(): Game {
    const game = new Game();
    game.id = this.data.id;
    game.result = this.resultForm.value;
    game.date = this.dateForm.value;
    game.whitePlayerID = this.whitePlayerID;
    game.blackPlayerID = this.blackPlayerID;
    game.tournamentID = this.tournamentID;
    return game;
  }

  setWhitePlayerFormValue() {
    this.playerService.getByID(this.whitePlayerID).pipe(map(player => {
      this.whitePlayerForm.setValue(player.name + ' ' + player.surname);
    })).subscribe();
  }

  setBlackPlayerFormValue() {
    this.playerService.getByID(this.blackPlayerID).pipe(map(player => {
      this.blackPlayerForm.setValue(player.name + ' ' + player.surname);
    })).subscribe();
  }

  setTournamentFormValue() {
    if (this.tournamentID > 0) {
      this.tournamentService.getByID(this.tournamentID).pipe(map(tournament => {
        this.tournamentForm.setValue(tournament.name);
      })).subscribe();
    }
  }

  public pickWhitePlayer() {
    const dialogRef = this.dialog.open(PlayerPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.whitePlayerID = id;
        this.setWhitePlayerFormValue();
      }
    });
  }

  public pickBlackPlayer() {
    const dialogRef = this.dialog.open(PlayerPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.blackPlayerID = id;
        this.setBlackPlayerFormValue();
      }
    });
  }

  public pickTournament() {
    const dialogRef = this.dialog.open(TournamentPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.tournamentID = id;
        this.setTournamentFormValue();
      }
    });
  }

}
