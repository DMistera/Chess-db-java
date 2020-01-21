import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { TournamentService } from 'src/app/shared/services/tournament/tournament.service';
import { DialogData } from 'src/app/shared/templates/editor-template';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Prize } from 'src/app/shared/models/prize';
import { SponsorPickerComponent } from '../../sponsor/sponsor-picker/sponsor-picker.component';

@Component({
  selector: 'app-prize-editor',
  templateUrl: './prize-editor.component.html',
  styleUrls: ['./prize-editor.component.scss']
})
export class PrizeEditorComponent implements OnInit {

  nameForm = new FormControl('', [Validators.required]);
  quantityForm = new FormControl('', [Validators.required, Validators.min(1)]);
  sponsorForm = new FormControl({value: '', disabled: true});

  form = new FormGroup({
    name: this.nameForm,
    quantity: this.quantityForm,
    sponsor: this.sponsorForm
  });

  constructor(
    private tournamentService: TournamentService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PrizeEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private tournamentID: number
  ) { }

  ngOnInit() {
  }

  createPrize(): Prize {
    const prize = new Prize();
    prize.name = this.nameForm.value;
    prize.quantity = this.quantityForm.value;
    prize.sponsorName = this.sponsorForm.value;
    prize.tournamentID = this.tournamentID;
    return prize;
  }

  onSubmit() {
    const prize = this.createPrize();
    this.tournamentService.addPrize(prize);
    this.dialogRef.close();
  }

  pickSponsor() {
    const dialogRef = this.dialog.open(SponsorPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.sponsorForm.setValue(id);
      }
    });
  }

}
