import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sponsor } from 'src/app/shared/models/sponsor';
import { SponsorService } from 'src/app/shared/services/sponsor/sponsor.service';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, map } from 'rxjs/operators';
import { uniqueValidator } from 'src/app/shared/validators/unique-validator';

@Component({
  selector: 'app-sponsor-editor',
  templateUrl: './sponsor-editor.component.html',
  styleUrls: ['./sponsor-editor.component.scss']
})
export class SponsorEditorComponent extends EditorTemplate<Sponsor, string> {

  constructor(
    sponsorService: SponsorService,
    dialogRef: MatDialogRef<SponsorEditorComponent>,
    @Inject(MAT_DIALOG_DATA)  data: DialogData<string>,
    snackBar: MatSnackBar
    ) {
     super(sponsorService, dialogRef, data, snackBar);
   }

  nameForm = new FormControl('', [Validators.required]);

  form = new FormGroup({
    name: this.nameForm
  });

  afterInit() {
    this.entityService.getAll().pipe(first(), map(sponsors => {
      this.nameForm.setValidators([Validators.required, uniqueValidator(sponsors.map(sponsor => sponsor.name))]);
    })).subscribe();
  }

  protected initForm(entity: Sponsor): void {
    this.nameForm.setValue(entity.name);
  }

  protected createEntity(): Sponsor {
    const sponsor = new Sponsor();
    sponsor.name = this.nameForm.value;
    return sponsor;
  }
  protected validate(): boolean {
    return this.form.valid;
  }

}
