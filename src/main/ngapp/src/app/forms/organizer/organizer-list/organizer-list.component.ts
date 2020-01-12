import { Component, OnInit } from '@angular/core';
import { Organizer } from 'src/app/shared/models/organizer';
import { Observable } from 'rxjs';
import { OrganizerService } from 'src/app/shared/services/organizer/organizer.service';
import { MatDialog } from '@angular/material/dialog';
import { OrganizerEditorComponent } from '../organizer-editor/organizer-editor.component';

@Component({
  selector: 'app-organizer-list',
  templateUrl: './organizer-list.component.html',
  styleUrls: ['./organizer-list.component.scss']
})
export class OrganizerListComponent implements OnInit {

  organizers$: Observable<Organizer[]>;

  constructor(
    private organizerService: OrganizerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.organizers$ = this.organizerService.getAll();
  }

  newOrganizer() {
    this.dialog.open(OrganizerEditorComponent, {
      data: {isNew: true}
    });
  }

  viewOrganizer(organizer: Organizer) {
    this.organizerService.navigate(organizer.name);
  }

  deleteOrganizer(organizer: Organizer) {
    this.organizerService.delete(organizer.name);
  }

}
