import { Injectable } from '@angular/core';
import { EntityService } from '../entity-service/entity.service';
import { Game } from '../../models/game';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class GameService extends EntityService<Game, number> {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  public getMoves(id: number): Observable<string[]> {
    return this.http.get<string[]>(this.url() + '/' + id + '/pgn');
  }

  public setPgn(id: number, pgn: string) {
    return this.http.put(this.url() + '/' + id + '/pgn', pgn).subscribe(() => {
      this.refreshID(id);
    });
  }

  protected url(): string {
    return 'game';
  }

  protected getID(entity: Game): number {
    return entity.id;
  }

  public getPlayerGames(playerID: number) : Observable<Game[]> {
    return this.http.get<Game[]>(this.url() + '/player/' + playerID);
  }

  public getTournamentGames(playerID: number) : Observable<Game[]> {
    return this.http.get<Game[]>(this.url() + '/tournament/' + playerID);
  }

}
