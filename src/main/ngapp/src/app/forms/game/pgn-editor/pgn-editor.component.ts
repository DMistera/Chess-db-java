import { Component, OnInit, Inject } from '@angular/core';
import { GameService } from 'src/app/shared/services/game/game.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pgn-editor',
  templateUrl: './pgn-editor.component.html',
  styleUrls: ['./pgn-editor.component.scss']
})
export class PgnEditorComponent implements OnInit {

  codeControl = new FormControl('', Validators.required);
  form = new FormGroup({
    code: this.codeControl
  });

  constructor(
    private gameService: GameService,
    private dialogRef: MatDialogRef<PgnEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private gameID: number
  ) { }

  ngOnInit() {
    // this.gameService.getPgn(this.gameID).subscribe(png => {
    //   this.codeControl.setValue(png);
    // });
  }

  onSubmit() {
    this.gameService.setPgn(this.gameID, this.codeControl.value);
    this.dialogRef.close();
  }

}
