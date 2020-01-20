import { Component, OnInit, Inject } from '@angular/core';
import { EditorTemplate, DialogData } from 'src/app/shared/templates/editor-template';
import { Tournament } from 'src/app/shared/models/tournament';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
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

  nameForm = new FormControl('');
  startDateForm = new FormControl('');
  endDateForm = new FormControl('');
  entryFeeForm = new FormControl('');
  locationForm = new FormControl('');

  organizerName: string;

  form = new FormGroup({
    name: this.nameForm,
    startDate: this.startDateForm,
    endDate: this.endDateForm,
    entryFee: this.entryFeeForm,
    location: this.locationForm
  });


  protected initForm(entity: Tournament): void {
    this.nameForm.setValue(entity.name);
    this.startDateForm.setValue(entity.startDate);
    this.endDateForm.setValue(entity.endDate);
    this.entryFeeForm.setValue(entity.entryFee);
    this.locationForm.setValue(entity.location);
    this.organizerName = entity.organizerName;
  }
  protected createEntity(): Tournament {
    const tournament: Tournament = this.form.value;
    tournament.organizerName = this.organizerName;
    if (this.data.id > 0) {
      tournament.id = this.data.id;
    }
    return tournament;
  }
  protected validate(): boolean {
    return this.form.valid && this.organizerName !== undefined;
  }

  public pickOrganizer() {
    const dialogRef = this.dialog.open(OrganizerPickerComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.organizerName = name;
      }
    });
  }

}
