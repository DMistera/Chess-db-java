import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Organizer } from 'src/app/shared/models/organizer';
import { OrganizerService } from 'src/app/shared/services/organizer/organizer.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-organizer-picker',
  templateUrl: './organizer-picker.component.html',
  styleUrls: ['./organizer-picker.component.scss']
})
export class OrganizerPickerComponent implements OnInit {

  organizers$: Observable<Organizer[]>;

  constructor(
    private organizerService: OrganizerService,
    private dialogRef: MatDialogRef<OrganizerPickerComponent>
  ) { }

  ngOnInit() {
    this.organizers$ = this.organizerService.getAll();
  }

  end(organizer: Organizer) {
    this.dialogRef.close(organizer.name);
  }

}
