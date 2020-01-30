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

  public getPgn(id: number): Observable<string> {
    console.log('pgn');
    return this.http.get(this.url() + '/' + id + '/pgn', { responseType: 'text' });
  }

  public setPgn(id: number, pgn: string): Observable<any> {
    return this.http.put(this.url() + '/' + id + '/pgn', pgn);
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

}
