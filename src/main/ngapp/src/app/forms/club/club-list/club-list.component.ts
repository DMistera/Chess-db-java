import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { Club } from 'src/app/shared/models/club';
import { MatDialog } from '@angular/material/dialog';
import { ClubEditorComponent } from '../club-editor/club-editor.component';
import { PlayerService } from 'src/app/shared/services/player/player.service';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit {

  clubs$: Observable<Club[]>;

  constructor(
    private clubService: ClubService,
    private playerService: PlayerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.clubs$ = this.clubService.getAll();
  }

  newClub() {
    this.dialog.open(ClubEditorComponent, {
      data: {isNew: true}
    });
  }

  viewClub(club: Club) {
    this.clubService.navigate(club.id);
  }

  deleteClub(club: Club) {
    this.clubService.delete(club.id);
    this.playerService.refresh();
  }

}
