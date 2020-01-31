import { Component, OnInit, Inject } from '@angular/core';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';
import { Organizer } from 'src/app/shared/models/organizer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizerService } from 'src/app/shared/services/organizer/organizer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, map } from 'rxjs/operators';
import { uniqueValidator } from 'src/app/shared/validators/unique-validator';

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

  nameForm = new FormControl('', [Validators.required]);

  form = new FormGroup({
    name: this.nameForm
  });

  afterInit() {
    this.entityService.getAll().pipe(first(), map(entities => {
      this.nameForm.setValidators([Validators.required, uniqueValidator(entities.map(entity => entity.name))]);
    })).subscribe();
  }

  protected initForm(entity: Organizer): void {
    this.nameForm.setValue(entity.name);
  }
  protected createEntity(): Organizer {
    return this.form.value;
  }
  protected validate(): boolean {
    return this.form.valid;
  }

}
