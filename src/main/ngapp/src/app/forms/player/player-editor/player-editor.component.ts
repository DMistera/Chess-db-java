import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { Player } from 'src/app/shared/models/player';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-player-editor',
  templateUrl: './player-editor.component.html',
  styleUrls: ['./player-editor.component.scss']
})
export class PlayerEditorComponent extends EditorTemplate<Player, number> {

  readonly categories = [
    'Senior Master', 'Life Master', 'Master', 'Candidate Master', '1st Category',  '2nd Category', '3rd Category', '4th Category', 'None'
  ]

  nameForm = new FormControl('');
  surnameForm = new FormControl('');
  eloForm = new FormControl('');
  categoryForm = new FormControl('');
  playerForm = new FormGroup({
    name: this.nameForm,
    surname: this.surnameForm,
    elo: this.eloForm,
    category: this.categoryForm
  });

  constructor(
     playerService: PlayerService,
     dialogRef: MatDialogRef<PlayerEditorComponent>,
     @Inject(MAT_DIALOG_DATA)  data: DialogData<number>,
     snackBar: MatSnackBar) {
      super(playerService, dialogRef, data, snackBar);
    }

  protected initForm(player: Player) {
    this.nameForm.setValue(player.name);
    this.surnameForm.setValue(player.surname);
    this.eloForm.setValue(player.elo);
    this.categoryForm.setValue(player.category);
  }

  protected validate(): boolean {
    return true;
  }

  protected createEntity(): Player {
    const result = this.playerForm.value;
    result.id = this.data.id;
    return result;
  }

}
