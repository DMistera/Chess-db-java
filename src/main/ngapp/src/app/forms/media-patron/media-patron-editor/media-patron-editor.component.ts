import { Component, OnInit, Inject } from '@angular/core';
import { MediaPatronService } from 'src/app/shared/services/media-patron/media-patron.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, EditorTemplate } from 'src/app/shared/templates/editor-template';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { MediaPatron } from 'src/app/shared/models/media-patron';

@Component({
  selector: 'app-media-patron-editor',
  templateUrl: './media-patron-editor.component.html',
  styleUrls: ['./media-patron-editor.component.scss']
})
export class MediaPatronEditorComponent extends EditorTemplate<MediaPatron, string> {

  constructor(
    mediaPatronService: MediaPatronService,
    dialogRef: MatDialogRef<MediaPatronEditorComponent>,
    @Inject(MAT_DIALOG_DATA)  data: DialogData<string>,
    snackBar: MatSnackBar
    ) {
     super(mediaPatronService, dialogRef, data, snackBar);
   }

  nameForm = new FormControl('');

  form = new FormGroup({
    name: this.nameForm
  });

  protected initForm(entity: MediaPatron): void {
    this.nameForm.setValue(entity.name);
  }
  protected createEntity(): MediaPatron {
    const mediaPatron = new MediaPatron();
    mediaPatron.name = this.nameForm.value;
    return mediaPatron;
  }
  protected validate(): boolean {
    return this.form.valid;
  }

}
