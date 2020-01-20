import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaPatronService } from 'src/app/shared/services/media-patron/media-patron.service';
import { MediaPatron } from 'src/app/shared/models/media-patron';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-media-patron-picker',
  templateUrl: './media-patron-picker.component.html',
  styleUrls: ['./media-patron-picker.component.scss']
})
export class MediaPatronPickerComponent implements OnInit {

  mediaPatrons$: Observable<MediaPatron[]>;

  constructor(
    private mediaPatronService: MediaPatronService,
    private dialogRef: MatDialogRef<MediaPatronPickerComponent>
  ) { }

  ngOnInit() {
    this.mediaPatrons$ = this.mediaPatronService.getAll();
  }

  end(mediaPatron: MediaPatron) {
    this.dialogRef.close(mediaPatron.name);
  }

}
