import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from 'src/app/shared/models/sponsor';
import { SponsorService } from 'src/app/shared/services/sponsor/sponsor.service';
import { MatDialog } from '@angular/material/dialog';
import { SponsorEditorComponent } from '../sponsor-editor/sponsor-editor.component';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss']
})
export class SponsorListComponent implements OnInit {

  sponsors$: Observable<Sponsor[]>;

  constructor(
    private sponsorService: SponsorService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sponsors$ = this.sponsorService.getAll();
  }

  newSponsor() {
    this.dialog.open(SponsorEditorComponent, {
      data: {isNew: true}
    });
  }

  deleteSponsor(sponsor: Sponsor) {
    this.sponsorService.delete(sponsor.name);
  }

  viewSponsor(sponsor: Sponsor) {
    this.sponsorService.navigate(sponsor.name);
  }



}
