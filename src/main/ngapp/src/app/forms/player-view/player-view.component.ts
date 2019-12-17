import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/models/player';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { map, mergeMap, switchMap, concatMap, tap, concatMapTo, exhaustMap } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player/player.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayerEditorComponent } from '../player-editor/player-editor.component';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  player$: Observable<Player>;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.player$ = this.loadPlayer$();

    this.playerService.getByID(1).pipe(tap(p => {
      console.log(p);
    }));
  }

  private loadPlayer$(): Observable<Player> {
    //TODO FIX
    return this.route.params.pipe(switchMap((params: Params) => {
      return this.playerService.getByID(params.id);
    }));
  }

  private getClubID(id: number) {
    
  }

  private editPlayer(playerID: number) {
    this.dialog.open(PlayerEditorComponent, {
      data: {id: playerID}
    });
  }

}
