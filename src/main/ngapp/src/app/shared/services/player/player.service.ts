import { Injectable } from '@angular/core';
import { Player } from '../../models/player';
import { EntityService } from '../entity-service/entity.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends EntityService<Player, number> {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  public getClubPlayers(clubID: number): Observable<Player[]> {
    return this.http.get<Player[]>(this.url() + '/club/' + clubID);
  }

  public getTournamentPlayers(tournamentID: number): Observable<Player[]> {
    return this.http.get<Player[]>(this.url() + '/tournament/' + tournamentID);
  }

  public getGameCount(id: number): Observable<number> {
    return this.http.get<number>(this.url() + '/count-game/' + id);
  }

  public getTournamentCount(id: number): Observable<number> {
    return this.http.get<number>(this.url() + '/count-tournament/' + id);
  }

  protected getID(entity: Player): number {
    return entity.id;
  }

  protected url(): string {
    return 'player';
  }
}
