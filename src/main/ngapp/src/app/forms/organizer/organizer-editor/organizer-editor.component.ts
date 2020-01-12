import { Component, OnInit, Inject } from '@angular/core';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';
import { Organizer } from 'src/app/shared/models/organizer';
import { FormControl, FormGroup } from '@angular/forms';
import { OrganizerService } from 'src/app/shared/services/organizer/organizer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-organizer-editor',
  templateUrl: './organizer-editor.component.html',
  styleUrls: ['./organizer-editor.component.scss']
})
export class OrganizerEditorComponent extends EditorTemplate<Organizer, string> {

  constructor(
    organizerService: OrganizerService,
    dialogRef: MatDialogRef<OrganizerEditorComponent>,
    @Inject(MAT_DIALOG_DATA)  data: DialogData<string>,
    snackBar: MatSnackBar
    ) {
     super(organizerService, dialogRef, data, snackBar);
   }

  nameForm = new FormControl('');

  form = new FormGroup({
    name: this.nameForm
  });

  protected initForm(entity: Organizer): void {
    this.nameForm.setValue(entity.name);
  }
  protected createEntity(): Organizer {
    return this.form.value;
  }
  protected validate(): boolean {
    return true;
  }

}
