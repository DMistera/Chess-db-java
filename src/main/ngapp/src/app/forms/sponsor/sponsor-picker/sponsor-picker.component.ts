import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from 'src/app/shared/models/sponsor';
import { SponsorService } from 'src/app/shared/services/sponsor/sponsor.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sponsor-picker',
  templateUrl: './sponsor-picker.component.html',
  styleUrls: ['./sponsor-picker.component.scss']
})
export class SponsorPickerComponent implements OnInit {

  sponsors$: Observable<Sponsor[]>;

  constructor(
    private sponsorService: SponsorService,
    private dialogRef: MatDialogRef<SponsorPickerComponent>
  ) { }

  ngOnInit() {
    this.sponsors$ = this.sponsorService.getAll();
  }

  end(sponsor: Sponsor) {
    this.dialogRef.close(sponsor.name);
  }

}
