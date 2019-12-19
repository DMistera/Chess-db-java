import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { Player } from 'src/app/shared/models/player';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';

@Component({
  selector: 'app-player-editor',
  templateUrl: './player-editor.component.html',
  styleUrls: ['./player-editor.component.scss']
})
export class PlayerEditorComponent extends EditorTemplate<Player, number> {

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
     @Inject(MAT_DIALOG_DATA)  data: DialogData<number>) {
      super(playerService, dialogRef, data);
    }

  protected initForm(player: Player) {
    this.nameForm.setValue(player.name);
    this.surnameForm.setValue(player.surname);
    this.eloForm.setValue(player.elo);
  }

  protected createEntity(): Player {
    const result = this.playerForm.value;
    result.id = this.data.id;
    return result;
  }

}
