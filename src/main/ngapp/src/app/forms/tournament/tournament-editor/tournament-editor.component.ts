import { Component, OnInit, Inject } from '@angular/core';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';
import { Tournament } from 'src/app/shared/models/tournament';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Organizer } from 'src/app/shared/models/organizer';
import { OrganizerPickerComponent } from '../../organizer/organizer-picker/organizer-picker.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tournament-editor',
  templateUrl: './tournament-editor.component.html',
  styleUrls: ['./tournament-editor.component.scss']
})
export class TournamentEditorComponent extends EditorTemplate<Tournament, number> {

  constructor(
    tournamentSerivce: TournamentService,
    dialogRef: MatDialogRef<TournamentEditorComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)  data: DialogData<number>,
    snackBar: MatSnackBar
    ) {
     super(tournamentSerivce, dialogRef, data, snackBar);
  }

  nameForm = new FormControl('', [Validators.required]);
  startDateForm = new FormControl('', [Validators.required]);
  endDateForm = new FormControl('', [Validators.required]);
  entryFeeForm = new FormControl('0', [Validators.required]);
  locationForm = new FormControl('', [Validators.required]);
  organizerForm = new FormControl({value: '', disabled: true}, [Validators.required]);

  form = new FormGroup({
    name: this.nameForm,
    startDate: this.startDateForm,
    endDate: this.endDateForm,
    entryFee: this.entryFeeForm,
    location: this.locationForm,
    organizerName: this.organizerForm
  });


  protected initForm(entity: Tournament): void {
    this.nameForm.setValue(entity.name);
    this.startDateForm.setValue(entity.startDate);
    this.endDateForm.setValue(entity.endDate);
    this.entryFeeForm.setValue(entity.entryFee);
    this.locationForm.setValue(entity.location);
    this.organizerForm.setValue(entity.organizerName);
  }
  protected createEntity(): Tournament {
    const tournament: Tournament = this.form.value;
    tournament.organizerName = this.organizerForm.value;
    if (this.data.id > 0) {
      tournament.id = this.data.id;
    }
    return tournament;
  }
  protected validate(): boolean {
    return this.form.valid;
  }

  public pickOrganizer() {
    const dialogRef = this.dialog.open(OrganizerPickerComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.organizerForm.setValue(name);
      }
    });
  }

}
