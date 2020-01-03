import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/shared/services/game/game.service';
import { Observable } from 'rxjs';
import { Game } from 'src/app/shared/models/game';
import { MatDialog } from '@angular/material/dialog';
import { GameEditorComponent } from '../game-editor/game-editor.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  games$: Observable<Game[]>;

  constructor(
    private gameService: GameService,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit() {
    this.games$ = this.gameService.getAll();
  }

  newGame() {
    this.dialog.open(GameEditorComponent, {
      data: {isNew: true}
    });
  }

  viewGame(game: Game) {
    this.router.navigate(['games/' + game.id]);
  }

}
