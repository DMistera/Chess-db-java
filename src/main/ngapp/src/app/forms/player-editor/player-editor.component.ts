import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { Player } from 'src/app/shared/models/player';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-player-editor',
  templateUrl: './player-editor.component.html',
  styleUrls: ['./player-editor.component.scss']
})
export class PlayerEditorComponent implements OnInit {

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

  id: number;

  constructor(
    private playerService: PlayerService,
    private dialogRef: MatDialogRef<PlayerEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData) { }

  ngOnInit() {
    this.id = this.data.id;
    if (this.id >= 0) {
      this.playerService.getPlayer(this.id).subscribe(player => {
        this.initForm(player);
      });
    }
  }

  onSubmit() {
    const player = this.createPlayer();
    if (player.id < 0) {
      this.playerService.createPlayer(player);
    } else {
      this.playerService.updatePlayer(player);
    }
    this.dialogRef.close();
  }

  private initForm(player: Player) {
    this.nameForm.setValue(player.name);
    this.surnameForm.setValue(player.surname);
    this.eloForm.setValue(player.elo);
  }

  private createPlayer(): Player {
    const result = this.playerForm.value;
    result.id = this.id;
    return result;
  }

}

export interface DialogData {
  id: number;
}
