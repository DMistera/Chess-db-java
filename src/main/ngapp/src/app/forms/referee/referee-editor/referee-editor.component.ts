import { Component, OnInit, Inject } from '@angular/core';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';
import { RefereeService } from 'src/app/shared/services/referee/referee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Referee } from 'src/app/shared/models/referee';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-referee-editor',
  templateUrl: './referee-editor.component.html',
  styleUrls: ['./referee-editor.component.scss']
})
export class RefereeEditorComponent extends EditorTemplate<Referee, number> {

  nameForm = new FormControl('', [Validators.required]);
  surnameForm = new FormControl('', [Validators.required]);
  form = new FormGroup({
    name: this.nameForm,
    surname: this.surnameForm
  });

  constructor(
    refereeService: RefereeService,
    dialogRef: MatDialogRef<RefereeEditorComponent>,
    @Inject(MAT_DIALOG_DATA)  data: DialogData<number>,
    snackBar: MatSnackBar) {
     super(refereeService, dialogRef, data, snackBar);
   }

  protected initForm(entity: Referee): void {
    this.nameForm.setValue(entity.name);
    this.surnameForm.setValue(entity.surname);
  }
  protected createEntity() {
    const referee = new Referee();
    referee.name = this.nameForm.value;
    referee.surname = this.surnameForm.value;
    referee.id = this.data.id;
    return referee;
  }
  
  protected validate(): boolean {
    return this.form.valid;
  }

}
