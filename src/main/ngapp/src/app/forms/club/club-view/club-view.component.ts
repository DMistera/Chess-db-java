import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Club } from 'src/app/shared/models/club';
import { first, switchMap, tap, filter } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { Player } from 'src/app/shared/models/player';
import { MatDialog } from '@angular/material/dialog';
import { ClubEditorComponent } from '../club-editor/club-editor.component';
import { PlayerPickerComponent } from '../../player/player-picker/player-picker.component';

@Component({
  selector: 'app-club-view',
  templateUrl: './club-view.component.html',
  styleUrls: ['./club-view.component.scss']
})
export class ClubViewComponent implements OnInit {

  club$: Observable<Club>;
  playerCount$: Observable<number>;
  clubPlayers$: Observable<Player[]>;
  id: number;

  constructor(
    private clubService: ClubService,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.club$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.clubService.getByID(parseInt(params.id, 10));
    }));

    this.playerCount$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.clubService.getPlayerCount(parseInt(params.id, 10));
    }));

    this.clubPlayers$ = this.club$.pipe(switchMap(club => {
      return this.playerService.getClubPlayers(club.id);
    }));
  }

  viewPlayer(player: Player) {
    this.playerService.navigate(player.id);
  }

  edit(club: Club) {
    this.dialog.open(ClubEditorComponent, {
      data: {isNew: false, id: club.id}
    });
  }

  addPlayer(clubID: number) {
    const dialogRef = this.dialog.open(PlayerPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.clubService.addPlayer(clubID, id);
      }
    });
  }

}
