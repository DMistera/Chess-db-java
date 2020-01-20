import { Component, OnInit } from '@angular/core';
import { MediaPatron } from 'src/app/shared/models/media-patron';
import { Observable } from 'rxjs';
import { MediaPatronService } from 'src/app/shared/services/media-patron/media-patron.service';
import { MatDialog } from '@angular/material/dialog';
import { MediaPatronEditorComponent } from '../media-patron-editor/media-patron-editor.component';

@Component({
  selector: 'app-media-patron-list',
  templateUrl: './media-patron-list.component.html',
  styleUrls: ['./media-patron-list.component.scss']
})
export class MediaPatronListComponent implements OnInit {

  mediaPatrons$: Observable<MediaPatron[]>;

  constructor(
    private mediaPatronService: MediaPatronService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mediaPatrons$ = this.mediaPatronService.getAll();
  }

  newMediaPatron() {
    this.dialog.open(MediaPatronEditorComponent, {
      data: {isNew: true}
    });
  }

  deleteMediaPatron(patron: MediaPatron) {
    this.mediaPatronService.delete(patron.name);
  }

  viewMediaPatron(patron: MediaPatron) {
    this.mediaPatronService.navigate(patron.name);
  }

}
