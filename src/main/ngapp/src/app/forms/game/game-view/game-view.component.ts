import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/shared/models/game';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/shared/services/game/game.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { PlayerService } from 'src/app/shared/services/player/player.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  game$: Observable<Game>;

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.game$ = this.route.params.pipe(first(), switchMap((params: Params) => {
      return this.gameService.getByID(parseInt(params.id, 10));
    }));
  }

  getPlayer$(id: number) {
    return this.playerService.getByID(id);
  }

}
