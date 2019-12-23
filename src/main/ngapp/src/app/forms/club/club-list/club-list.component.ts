import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { Club } from 'src/app/shared/models/club';
import { MatDialog } from '@angular/material/dialog';
import { ClubEditorComponent } from '../club-editor/club-editor.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit {

  clubs$: Observable<Club[]>;

  constructor(
    private clubService: ClubService,
    private dialog: MatDialog,
    private router: Router
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
    this.router.navigate(['clubs/' + club.id]);
  }

}
