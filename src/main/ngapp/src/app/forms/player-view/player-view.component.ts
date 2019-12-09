import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/models/player';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player/player.service';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  player$: Observable<Player>;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.player$ = this.loadPlayer$();
  }

  private loadPlayer$(): Observable<Player> {
    return this.route.params.pipe(mergeMap((params: Params) => {
      return this.playerService.getPlayer$(params.id);
    }));
  }

}
