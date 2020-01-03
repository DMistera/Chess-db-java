import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/models/player';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { map, mergeMap, switchMap, concatMap, tap, concatMapTo, exhaustMap, first } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerEditorComponent } from '../player-editor/player-editor.component';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { Club } from 'src/app/shared/models/club';
import { ClubPickerComponent } from '../../club/club-picker/club-picker.component';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  player$: Observable<Player>;

  constructor(
    private playerService: PlayerService,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.player$ = this.loadPlayer$();
  }

  private joinClub(playerID: number) {
    const dialogRef = this.dialog.open(ClubPickerComponent);
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.clubService.addPlayer(id, playerID);
      }
    });
  }

  private loadPlayer$(): Observable<Player> {
    return this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.playerService.getByID(parseInt(params.id, 10));
    }));
  }

  private getClub$(id: number): Observable<Club> {
    return this.clubService.getByID(id);
  }

  private editPlayer(playerID: number) {
    this.dialog.open(PlayerEditorComponent, {
      data: {id: playerID, isNew: false}
    });
  }

}
