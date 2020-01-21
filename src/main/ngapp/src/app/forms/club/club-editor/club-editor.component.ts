import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerEditorComponent } from '../../player/player-editor/player-editor.component';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';
import { Club } from 'src/app/shared/models/club';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, map } from 'rxjs/operators';
import { uniqueValidator } from 'src/app/shared/validators/unique-validator';

@Component({
  selector: 'app-club-editor',
  templateUrl: './club-editor.component.html',
  styleUrls: ['./club-editor.component.scss']
})
export class ClubEditorComponent extends EditorTemplate<Club, number> {

  nameForm = new FormControl('', [Validators.required]);
  clubForm = new FormGroup({
    name: this.nameForm
  });

  constructor(
     clubService: ClubService,
     dialogRef: MatDialogRef<PlayerEditorComponent>,
     @Inject(MAT_DIALOG_DATA)  data: DialogData<number>,
     snackBar: MatSnackBar
    ) {
      super(clubService, dialogRef, data, snackBar);
  }

  protected initForm(entity: Club): void {
    this.nameForm.setValue(entity.name);
  }

  protected validate(): boolean {
    return true;
  }

  protected createEntity(): Club {
    const club = new Club();
    club.name = this.nameForm.value;
    club.id = this.data.id;
    return club;
  }

}
